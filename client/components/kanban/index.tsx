import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { LexoRank } from 'lexorank';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import axios from '../../lib/axios';
import { CardType, ColumnType } from '../../share/type/kanban';
import Column from './Column';
import { applyDrag } from './utils';
// import { useRouter } from 'next/router';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

// import { Lexorank } from '../../lib/lexorank';
// const lexorank = new Lexorank();

const generateOrder = (
  columns: ColumnType[] | CardType[],
  indexAdded: number,
  indexRemove: number
) => {
  let pre = '';
  let next = '';
  if (indexRemove === null) {
    // move between column
    if (columns.length === 0) return LexoRank.middle().toString();
    if (indexAdded === 0) return LexoRank.parse(columns[0].order).genPrev().toString();
    if (indexAdded === columns.length)
      return LexoRank.parse(columns.slice(-1)[0].order).genNext().toString();
    pre = columns[indexAdded - 1].order;
    next = columns[indexAdded].order;
  } else {
    if (indexAdded === 0) return LexoRank.parse(columns[0].order).genPrev().toString();
    if (indexAdded === columns.length - 1)
      return LexoRank.parse(columns.slice(-1)[0].order).genNext().toString();

    pre = columns[indexAdded - 1].order;
    next = columns[indexAdded].order;
  }
  return LexoRank.parse(pre).between(LexoRank.parse(next)).toString();
};
// const generateNextOrder = (columns: ColumnType[] | CardType[]) => {
//   const pre = columns.length === 0 ? '0' : columns[columns.length - 1].order;
//   return lexorank.insert(pre, '')[0];
// };
const Kanban: React.FC = () => {
  const router = useRouter();
  const { slug: boardId } = router.query;

  const {
    data: column,
    refetch,
    status,
    isLoading,
  } = useQuery({
    queryKey: ['column???'],
    queryFn: async (): Promise<ColumnType[]> => {
      return (await axios.get(`/column/${router.query.slug}`)).data;
    },
  });

  const [columns, setColumns] = useState<ColumnType[]>(column ?? []);
  console.log('adasdas', columns);

  const [isAddNewColumn, setIsAddNewColumn] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');

  const inputAddRef = useRef<HTMLInputElement>(null);

  //   const onExpired = () => {
  //     dispatch(logoutLocal());
  //     navigation(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
  //   };

  //   dispatch(setBoardId(slug ?? ''));

  useEffect(() => {
    setColumns(column ?? []);
  }, [column]);

  useEffect(() => {
    const isInputAdded = inputAddRef && inputAddRef.current;

    if (isInputAdded) {
      inputAddRef.current.focus();
    }
  }, [isAddNewColumn]);

  const onColumnDrop = async (dropResult: DropResult) => {
    const { addedIndex, removedIndex, payload } = dropResult;
    console.log(
      '🚀 ~ file: index.tsx:98 ~ onColumnDrop ~ addedIndex, removedIndex:',
      addedIndex,
      removedIndex,
      LexoRank.middle().toString(),
      LexoRank.min().genPrev().toString()
    );

    if (dropResult.addedIndex === dropResult.removedIndex) return;
    const order = generateOrder(columns, addedIndex, removedIndex);

    let newColumns = [...columns];
    newColumns = newColumns.map((item) => {
      if (item._id === payload._id) {
        return {
          ...item,
          order,
        };
      }
      return item;
    });
    newColumns = applyDrag(newColumns, dropResult);

    setColumns(newColumns);

    axios.patch(`/column/${payload._id}`, {
      order,
    });

    // await refetch();

    // setColumns([...(await refetch()).data]);
    // const dropColumn: DropRequest = {
    //   controller: CONTROLLER_DROP_COLUMN,
    //   addedIndex: dropResult.addedIndex ?? -1,
    //   removedIndex: dropResult.removedIndex ?? -1,
    //   columnId: dropResult.payload.id,
    // };
    // onDropColumnService(dropColumn).catch(() => onExpired());
  };

  const handleCardDrop = (column: ColumnType, dropResult: DropResult) => {
    const noDropCard = dropResult.removedIndex === null && dropResult.addedIndex == null;
    if (noDropCard) return;

    const { addedIndex, removedIndex, payload } = dropResult;
    if (addedIndex === null) return;
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    const order = generateOrder(column.cards, addedIndex, removedIndex);

    let newColumns = [...columns];

    let currentColumn = newColumns.find((c) => c._id === column._id) ?? {
      cards: [],
      cardOrder: '',
    };
    if (dropResult.removedIndex === null) {
      let oldColumn = newColumns.find((c) => c._id === payload.columnId);
      console.log("🚀 ~ file: index.tsx:153 ~ handleCardDrop ~ oldColumn:", oldColumn,payload.columnId)
      oldColumn.cards = oldColumn.cards.filter((card) => card._id !== payload._id);
    }

    currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
    currentColumn.cards = currentColumn.cards.map((item) => {
      if (item._id !== payload._id) return item;
      return {
        ...item,
        order: order,
        columnId: column._id,
      };
    });
    currentColumn.cardOrder = currentColumn.cards.map((card) => card._id);
    console.log('run herre', currentColumn);

    setColumns(newColumns);

    axios.patch(`/card/${payload._id}`, {
      order,
      columnId: column._id,
      oldColumnId: payload.columnId,
    });

    // const indexOfOldCol = columns.findIndex((col) => col._id === dropResult.payload._id);
    // const indexOfCardInOldCol = columns[indexOfOldCol].cards.findIndex(
    //   (card) => card.id === dropResult.payload.id
    // );

    // const dropCardOneColumn = dropResult.removedIndex !== null && dropResult.addedIndex !== null;
    // if (dropCardOneColumn) {
    //   //   const cardRequest: DropRequest = {
    //   //     controller: CONTROLLER_DROP_CARD_ONE_COLUMN,
    //   //     removedIndex: dropResult.removedIndex ?? -1,
    //   //     addedIndex: dropResult.addedIndex ?? -1,
    //   //     cardId: dropResult.payload.id,
    //   //     columnId: dropResult.payload.columnId,
    //   //   };
    //   //   onDropCardOneColumnService(cardRequest).catch(() => onExpired());
    //   return;
    // }

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

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      inputAddRef.current?.focus();
      return;
    }

    // if no column -> min else last order column
    const order =
      columns.length === 0
        ? LexoRank.middle().toString()
        : LexoRank.parse(columns.slice(-1)[0].order).genNext().toString();

    const res: ColumnType = (
      await axios.post('/column', {
        title: newColumnTitle,
        order,
        boardId,
      })
    ).data;
    setColumns([...columns, res]);
    res && await refetch();

    // let columnsAfterAdd = [...columns];

    // const ColumnRequest: ColumnRequest = {
    //   boardId: newAddedColumn.boardId,
    //   columnId: newAddedColumn.id,
    //   controller: CONTROLLER_ADD_NEW_COLUMN,
    //   title: newAddedColumn.title,
    //   order: columnsAfterAdd.length - 1,
    // };
    // addNewColumnService(ColumnRequest).catch(() => onExpired());

    // setColumns(columnsAfterAdd);

    setNewColumnTitle('');
  };
  const updateColumn = (coloumnUpdated: ColumnType, isDeleteColumn: boolean) => {
    let newColumns = [...columns];
    const indexOfColumnUpdate = newColumns.findIndex(
      (columnId) => columnId._id === coloumnUpdated._id
    );
    if (isDeleteColumn) {
      newColumns.splice(indexOfColumnUpdate, 1);
    } else {
      newColumns.splice(indexOfColumnUpdate, 1, coloumnUpdated);
    }
    setColumns(newColumns);
  };

  const handleDeleteColumn = async (id) => {
    await axios.delete(`/column/${id}`);
    refetch();
  };
  const handleAddNewCard = async (title: string, column: ColumnType) => {
    if (title === '') return;

    const { cards } = column;
    // if no column -> min else last order column
    const order =
      cards.length === 0
        ? LexoRank.middle().toString()
        : LexoRank.parse(cards.slice(-1)[0].order).genNext().toString();
    const res = await axios.post<CardType>('/card', {
      title: title,
      order,
      columnId: column._id,
    });
    let newColumns = [...columns].map((col) => {
      if (col._id !== column._id) return col;
      return {
        ...col,
        cards: [...col.cards, res.data],
      };
    });
    setColumns(newColumns);
  };
  if (isLoading) return <h1>loading</h1>;
  return (
    <div className="rounded-md bg-[#BCB4D8]">
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

      <Scrollbars style={{ height: '88vh' }}>
        <div className="flex rounded mt-5">
          <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
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
                <Draggable key={column._id}>
                  <Column
                    column={column}
                    key={column._id}
                    onCardDrop={handleCardDrop}
                    updateColumn={updateColumn}
                    onDelete={handleDeleteColumn}
                    onAddNewCard={handleAddNewCard}
                  />
                </Draggable>
              ))}
            </Container>
          </DndProvider>
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
