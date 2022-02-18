import { useEffect } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';

const MOBILE_COLUMN_NUM = 2;
const TABLET_COLUMN_NUM = 3;
const DESKTOP_COLUMN_NUM = 4;

const TableContainer = styled.div`
  display: grid;
  min-height: 100%;
  height: 100%;
  width: 100%;
  padding: 1rem;
  grid-template-rows: ${props => `repeat(${props.numRows}, 1fr)`};
  grid-gap: 1rem;
`

const TableSelection = styled.div`
  grid-column-start: ${props => props.columnStart};
  grid-column-end: ${props => props.columnEnd};
  grid-row-start: ${props => props.rowStart};
  grid-row-end: ${props => props.rowEnd};
  display: flex;
  justify-content: center;
  align-items: center;
`

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
`

const GameTitle = styled.div`
  margin-top: 1rem;
  text-align: center;
  max-width: 200px;
`

const Table = ({ collection }) => {
  const { isMobile, isTablet } = useWindowDimensions();

  let numColumns = DESKTOP_COLUMN_NUM;
  if (isTablet) {
    numColumns = TABLET_COLUMN_NUM;
  } else if (isMobile) {
    numColumns = MOBILE_COLUMN_NUM;
  }

  const numRows = Math.floor(collection.length / numColumns);

  return (
    <TableContainer numRows={numRows} numColumns={numColumns}>
      {collection.map((game, i) => {
        let itemRowStart;
        let itemRowEnd;
        let itemColumnStart;
        let itemColumnEnd;

        itemRowStart = Math.floor(i / numColumns) + 1;
        itemRowEnd = itemRowStart + 1;

        itemColumnStart = (i % numColumns) + 1;
        itemColumnEnd = itemColumnStart + 1;

        return (
          <TableSelection
            key={game.id}
            rowStart={itemRowStart}
            rowEnd={itemRowEnd}
            columnStart={itemColumnStart}
            columnEnd={itemColumnEnd}
          >
            <ItemContainer>
              <ItemImageContainer>
                <ItemImage src={game.thumbnail} />
              </ItemImageContainer>

              <GameTitle>
                {game.name}
              </GameTitle>
            </ItemContainer>
          </TableSelection>
        )
      })}
    </TableContainer>
  )
}

export default Table;