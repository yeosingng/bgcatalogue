const axios = require('axios');
const xml2js = require('xml2js');
const { writeFileSync } = require('fs');

function mapXMLtoJson(game) {
	return {
		id: game.id[0],
		thumbnail: game.thumbnail[0],
		image: game.image[0],
		description: game.description[0],
		name: game.name[0].value[0],
		yearPublished: game.yearpublished[0].value[0],
		minPlayers: game.minplayers[0].value[0],
		maxPlayers: game.maxplayers[0].value[0],
		minPlayingTime: game.minplaytime[0].value[0],
		maxplaytime: game.maxplaytime[0].value[0],
		categories: game.link.filter(v => v.type[0] === 'boardgamecategory').map(v => v.value[0]),
		mechanics: game.link.filter(v => v.type[0] === 'boardgamemechanic').map(v => v.value[0]),
		rating: game.statistics[0].ratings[0].average[0].value[0],
		rank: game.statistics[0].ratings[0].ranks[0].rank[0].value[0],
		weight: game.statistics[0].ratings[0].averageweight[0].value[0],
	}
}

async function pullData() {
	const res = await axios.get('https://boardgamegeek.com/xmlapi2/collection?username=YeoSi');
	const collectionData =await xml2js.parseStringPromise(res.data);

	const { items: { item: collection } } = collectionData;

	const promiseArray = collection.map(async (i) => {
		const { objectid } = i.$;
		const res = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${objectid}&type=boardgame&stats=1`);
		return xml2js.parseStringPromise(res.data, {
			mergeAttrs: true,
		});
	})

	const gameData = await Promise.all(promiseArray);

	const mappedData = gameData.map((value) => {
		const { items: { item: game } } = value;
		return mapXMLtoJson(game[0]);
	})

	writeFileSync('../data/collection.json', JSON.stringify(mappedData));
}

pullData();