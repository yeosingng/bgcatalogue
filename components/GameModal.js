import Modal from 'react-modal';
import { useGameContext } from '../context/GameContext';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 300px;
  max-height: 400px;
  width: auto;
  height: 100%;
`;

const CloseAnchor = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Text = styled.div`

`;

const Description = styled.div`
  padding-bottom: 2rem;
`;

const GameModal = () => {
  const { selectedGame, setSelectedGame } = useGameContext();

  if (!selectedGame) return <></>;

  let playerCountText = `(${selectedGame.minPlayers} - ${selectedGame.maxPlayers})`;
  if (selectedGame.minPlayers === selectedGame.maxPlayers) {
    playerCountText = selectedGame.minPlayers;
  }

  return (
    <Modal
      isOpen={!!selectedGame}
      preventScroll
      onRequestClose={() => setSelectedGame(null)}
    >
      <Content>
        <CloseAnchor>
          <CloseButton onClick={() => setSelectedGame(null)}>
            X
          </CloseButton>
        </CloseAnchor>

        <ImageContainer>
          <Image alt='game image' src={selectedGame.image} />
        </ImageContainer>

        <Details>
          <Text>Title: {selectedGame.name}</Text>
          <Text>Player Count: {playerCountText}</Text>
          <Text>Playing time: {selectedGame.playingTime} minutes</Text>
          <Text>Complexity: {selectedGame.weight}/5</Text>
          <Text>
            <a href={`https://boardgamegeek.com/boardgame/${selectedGame.gameId}/`} target='_blank' rel="noreferrer">
              Bgg link
            </a>
          </Text>
          {/* <Description>{selectedGame.description}</Description> */}
        </Details>
      </Content>
    </Modal>
  );
};

export default GameModal;