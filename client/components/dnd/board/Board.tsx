// @flow
import React, { useState } from 'react';
import styled from '@xstyled/styled-components';
import { colors } from '@atlaskit/theme';
import PropTypes from 'prop-types';
import Column from './Column';
import reorder, { reorderQuoteMap } from '../reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styledComponents from 'styled-components';
import { BoardMap } from '../type';
import { ColumnType } from '../../../share/type/kanban';
import { Lexorank } from '../../../lib/lexorank';
import axios from '../../../lib/axios';
const lexorank = new Lexorank();
const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;
interface BoardProps {
  initial: BoardMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
  initColumns: ColumnType[];
}
const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;
const Board = ({
  isCombineEnabled,
  initial,
  useClone,
  containerHeight,
  withScrollableColumns,
  initColumns,
}: BoardProps) => {
  const [columns, setColumns] = useState(initial);

  const [ordered, setOrdered] = useState(Object.keys(initial));

  const onDragEnd = async (result) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const reorderedorder = reorder(ordered, source.index, destination.index);
      const pre =
        destination.index == 0
          ? ''
          : initColumns.find((column) => column._id === reorderedorder[destination.index - 1])
              .order;
      const next =
        destination.index == reorderedorder.length - 1
          ? ''
          : initColumns.find((column) => column._id === reorderedorder[destination.index + 1])
              .order;
      const order=lexorank.insert(pre, next)[0];
      
      await axios.patch(`/column/${result.draggableId}`, {
        order,
      });
 
      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumns(data.quoteMap);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ParentContainer height={400}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={Boolean(containerHeight)}
            isCombineEnabled={isCombineEnabled}
          >
            {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {ordered.map((key, index) => (
                  <Column
                    id={key}
                    key={key}
                    index={index}
                    title={initColumns.find((column) => column._id === key).title}
                    quotes={columns[key]}
                    isScrollable={withScrollableColumns}
                    isCombineEnabled={isCombineEnabled}
                    useClone={useClone}
                  />
                ))}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </ParentContainer>
      </DragDropContext>
    </>
  );
};

Board.defaultProps = {
  isCombineEnabled: false,
};

Board.propTypes = {
  isCombineEnabled: PropTypes.bool,
};

export default Board;
