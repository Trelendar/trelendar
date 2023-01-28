import React, { useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Column from './Column';
import { BoardType, ColumnRequest, ColumnType, DropRequest } from '../../share/type';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { WithContext as ReactTags } from 'react-tag-input';
// import { useRouter } from 'next/router';

const Kanban: React.FC = () => {
  // const router = useRouter();
	// const { slug } = router	.query;

  const [board, setBoard] = useState<BoardType>({
    id: '1',
    columnOrder: [],
    columns: [],
  });
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isAddNewColumn, setIsAddNewColumn] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const inputAddRef = useRef<HTMLInputElement>(null);

  //   const onExpired = () => {
  //     dispatch(logoutLocal());
  //     navigation(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
  //   };

  //   dispatch(setBoardId(slug ?? ''));

  //   useEffect(() => {
  //     // if (!isLogin) navigation(`..${appRouters.LINK_TO_HOME_PAGE}`);
  //     const getColumnsData = async () => {
  //       try {
  //         const res = await getColumns(slug ?? '');
  //         if (res.data.status !== 'Success') return;

  //         let newColumns = res.data.columns ?? [];
  //         newColumns = getCardToColumn(newColumns);

  //         setColumns(newColumns);

  //         setBoard({
  //           ...board,
  //           columns: newColumns,
  //         });
  //       } catch {
  //         onExpired();
  //       }
  //     };
  //     getColumnsData();
  //   }, []);

  useEffect(() => {
    const isInputAdded = inputAddRef && inputAddRef.current;

    if (isInputAdded) {
      inputAddRef.current.focus();
    }
  }, [isAddNewColumn]);

  const onColumnDrop = (dropResult: DropResult) => {
    // const dropColumn: DropRequest = {
    //   controller: CONTROLLER_DROP_COLUMN,
    //   addedIndex: dropResult.addedIndex ?? -1,
    //   removedIndex: dropResult.removedIndex ?? -1,
    //   columnId: dropResult.payload.id,
    // };
    // onDropColumnService(dropColumn).catch(() => onExpired());

    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard({
      ...board,
      columnOrder: newColumns.map((column) => column.id),
      columns: newColumns,
    });
  };

  const onCardDrop = (columnId: string, dropResult: DropResult) => {
    const noDropCard = dropResult.removedIndex === null && dropResult.addedIndex == null;
    if (noDropCard) return;

    const indexOfOldCol = columns.findIndex((col) => col.id === dropResult.payload.columnId);
    const indexOfCardInOldCol = columns[indexOfOldCol].cards.findIndex(
      (card) => card.id === dropResult.payload.id
    );

    let newColumns = [...columns];

    let currentColumn = newColumns.find((c) => c.id === columnId) ?? {
      cards: [],
      cardOrder: '',
    };
    const lastIndexInNewCol = currentColumn.cards.length;

    currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
    currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
    setColumns(newColumns);

    const dropCardOneColumn = dropResult.removedIndex !== null && dropResult.addedIndex !== null;
    if (dropCardOneColumn) {
      //   const cardRequest: DropRequest = {
      //     controller: CONTROLLER_DROP_CARD_ONE_COLUMN,
      //     removedIndex: dropResult.removedIndex ?? -1,
      //     addedIndex: dropResult.addedIndex ?? -1,
      //     cardId: dropResult.payload.id,
      //     columnId: dropResult.payload.columnId,
      //   };
      //   onDropCardOneColumnService(cardRequest).catch(() => onExpired());
      return;
    }

    if (dropResult.removedIndex !== null) return;

    // const cardRequestMul: DropRequest = {
    //   controller: CONTROLLER_DROP_CARD_MUL_COLUMN,
    //   oldColumnId: dropResult.payload.columnId,
    //   newColumnId: columnId,
    //   oldIndex: indexOfCardInOldCol,
    //   newIndex: dropResult.addedIndex ?? -1,
    //   cardId: dropResult.payload.id,
    //   lastIndexInNewCol: lastIndexInNewCol,
    // };

    // onDropCardMulColService(cardRequestMul).catch(() => onExpired());
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      inputAddRef.current?.focus();
      return;
    }
    const newAddedColumn: ColumnType = {
      id: Date.now().toString(),
      boardId: board.id,
      title: newColumnTitle,
      cards: [],
      cardOrder: [],
    };
    let columnsAfterAdd = [...columns];
    columnsAfterAdd.push(newAddedColumn);

    // const ColumnRequest: ColumnRequest = {
    //   boardId: newAddedColumn.boardId,
    //   columnId: newAddedColumn.id,
    //   controller: CONTROLLER_ADD_NEW_COLUMN,
    //   title: newAddedColumn.title,
    //   order: columnsAfterAdd.length - 1,
    // };
    // addNewColumnService(ColumnRequest).catch(() => onExpired());

    setColumns(columnsAfterAdd);
    setBoard({
      ...board,
      columnOrder: columnsAfterAdd.map((column) => column.id),
      columns: columnsAfterAdd,
    });
    setNewColumnTitle('');
  };

  const updateColumn = (coloumnUpdated: ColumnType, isDeleteColumn: boolean) => {
    let newColumns = [...columns];
    const indexOfColumnUpdate = newColumns.findIndex(
      (columnId) => columnId.id === coloumnUpdated.id
    );

    if (isDeleteColumn) {
        newColumns.splice(indexOfColumnUpdate, 1);
      // const ColumnRequest: ColumnRequest = {
      //     controller: CONTROLLER_DELETE_COLUMN,
      //     boardId: coloumnUpdated.boardId,
      //     columnId: coloumnUpdated.id,
      //     order: indexOfColumnUpdate,
      //   };
      //   deleteColumnService(ColumnRequest).catch(() => onExpired());
    } else {
      newColumns.splice(indexOfColumnUpdate, 1, coloumnUpdated);
    }

    setColumns(newColumns);
    setBoard({
      ...board,
      columnOrder: newColumns.map((column) => column.id),
      columns: newColumns,
    });
  };

  return (
    <div className="h-[85vh] rounded-md bg-[#BCB4D8] px-5">
      {/* {!loaded && (
        <div className="pt-2">
          <button
            className="bg-[#68589b] hover:bg-[#48367F] text-white font-bold py-2 px-4 rounded"
            onClick={() => setLoaded(true)}
          >
            Show Card
          </button>
        </div>
      )} */}

      <Scrollbars style={{ height: '85vh' }}>
        <div className="flex rounded mt-5">
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              // @ts-ignore
              animationDuration: 150,
              showOnTop: true,
              className: 'column bg-[#C9CCD9] rounded p-2 mr-6 ml-10',
            }}
            getChildPayload={(index) => columns[index]}
          >
            {columns.map((column: ColumnType) => (
              // @ts-ignore
              <Draggable key={column.id}>
                <Column
                  column={column}
                  key={column.id}
                  onCardDrop={onCardDrop}
                  updateColumn={updateColumn}
                />
              </Draggable>
            ))}
          </Container>
          {!isAddNewColumn && (
            <motion.div
              initial={{ y: '-100px', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="add-new-column w-[172px]"
              onClick={() => setIsAddNewColumn(true)}
            >
              <AiOutlinePlus size={25} color="gray" className="pt-1" />
              <div className="text-gray-500 ml-1 pt-1 font-semibold">Add column</div>
            </motion.div>
          )}
          {isAddNewColumn && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-[272px] h-[110px] p-2 rounded bg-[#ebecf0] shadow-md"
            >
              <input
                type="text"
                placeholder="Title..."
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="shadow block p-2 w-full text-gray-900 bg-gray-50 rounded border-[1.7px] border-[#68589b] font-semibold"
                ref={inputAddRef}
                value={newColumnTitle}
                onKeyDown={(e) => e.key === 'Enter' && addNewColumn()}
              />
              <div className="flex">
                <button className="button-add-new-clomn-form" onClick={addNewColumn}>
                  Add column
                </button>
                <GrClose
                  onClick={() => setIsAddNewColumn(false)}
                  className="mt-4 ml-6 cursor-pointer hover:scale-110 transition-all"
                  size={20}
                />
              </div>
            </motion.div>
          )}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Kanban;
