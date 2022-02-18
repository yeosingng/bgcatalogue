import { useEffect } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';

const MOBILE_COLUMN_NUM = 2;
const DESKTOP_COLUMN_NUM = 4;
const itemHeight = 200;

const TableContainer = styled.div`
  display: grid;
  min-height: 100%;
  height: ${props => `${(props.numRows) * itemHeight}px`};
  width: 100%;
  padding: 1rem;
  grid-template-columns: ${({ isMobile }) => isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'};
  grid-template-rows: ${props => `repeat(${props.numRows}, 1fr)`};
`

const TableSelection = styled.div`
  grid-column-start: ${props => props.columnStart};
  grid-column-end: ${props => props.columnEnd};
  grid-row-start: ${props => props.rowStart};
  grid-row-end: ${props => props.rowEnd};
`

const Table = ({ collection }) => {
  const { isMobile } = useWindowDimensions();

  const numColumns = isMobile ? MOBILE_COLUMN_NUM : DESKTOP_COLUMN_NUM;
  const numRows = Math.floor(collection.length / numColumns);

  return (
    <TableContainer numRows={numRows} isMobile={isMobile}>
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
          <TableSelection rowStart={itemRowStart} rowEnd={itemRowEnd} columnStart={itemColumnStart} columnEnd={itemColumnEnd} >
            <img src={game.thumbnail} />
            {game.name}
          </TableSelection>
        )
      })}
    </TableContainer>
  )
}

export default Table;