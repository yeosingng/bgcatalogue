import fs from 'fs';
import Head from 'next/head';
import Table from '../components/Table';
import Header from '../components/Header';
import styled from 'styled-components';
import Modal from 'react-modal';
import GameContextProvider from '../context/GameContext';
import GameModal from '../components/GameModal';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
`;

const Main = styled.main`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  flex: 1;
`;

Modal.setAppElement('#__next');

export default function Home(props) {
  const { collection } = props;
  return (
    <Container>
      <Head>
        <title>Yeo&apos;s BG Catalogue</title>
        <meta name="description" content="Yeo's BG Catalogue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header />
        <GameContextProvider>
          <Table collection={collection} />
          <GameModal />
        </GameContextProvider>
      </Main>
    </Container>
  );
}

// getStaticProps only runs in the Node side, so it is safe
// to use libraries from Node here
export async function getStaticProps() {
  const collection = await fs.readFileSync(`${process.cwd()}/data/collection.json`);

  return {
    props: {
      collection: JSON.parse(collection),
    }
  };
}
