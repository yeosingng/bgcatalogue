import styled from 'styled-components';
import useWindowDimensions, { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../hooks/useWindowDimensions';
import { useGameContext } from '../context/GameContext';

const MOBILE_COLUMN_NUM = 2;
const TABLET_COLUMN_NUM = 3;
const DESKTOP_COLUMN_NUM = 4;

const TableContainer = styled.div`
  display: grid;
  min-height: 100%;
  height: 100%;
  width: 100%;
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: ${props => `repeat(${props.numRows}, 1fr)`};
  @media (max-width: ${TABLET_BREAKPOINT}px) {
    grid-template-columns: repeat(3, 1fr);
  };
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: repeat(2, 1fr);
  };
`;

const TableSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  };
`;

const ItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemImage = styled.img`
  max-height: 250px;
`;

const GameTitle = styled.div`
  margin-top: 1rem;
  text-align: center;
  max-width: 200px;
`;

const Table = ({ collection }) => {
  const { setSelectedGame } = useGameContext();
  const { isMobile, isTablet } = useWindowDimensions();

  let numColumns = DESKTOP_COLUMN_NUM;
  if (isTablet) {
    numColumns = TABLET_COLUMN_NUM;
  } else if (isMobile) {
    numColumns = MOBILE_COLUMN_NUM;
  }

  const numRows = Math.floor(collection.length / numColumns);

  return (
    <TableContainer numColumns={numColumns} numRows={numRows}>
      {collection.map((game, i) => {
        return (
          <TableSelection key={i} onClick={() => setSelectedGame(game)}>
            <ItemContainer>
              <ItemImageContainer>
                <ItemImage src={game.thumbnail} />
              </ItemImageContainer>

              <GameTitle>
                {game.name}
              </GameTitle>
            </ItemContainer>
          </TableSelection>
        );
      })}
    </TableContainer>
  );
};

export default Table;