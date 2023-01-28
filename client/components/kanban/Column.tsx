import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardRequest, CardType, ColumnRequest, ColumnType } from '../../share/type';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { confirmDelete } from './utils';

interface Props {
  column: ColumnType;
  onCardDrop: (columnId: string, dropResult: DropResult) => void;
  updateColumn: (coloumnUpdated: ColumnType, isDeleteColumn: boolean) => void;
}

const Board: React.FC<Props> = (props) => {
  const { onCardDrop, column, updateColumn } = props;

  const [isUpdateTitle, setIsUpdateTitle] = useState<boolean>(false);
  const [isAddNewCard, setIsAddNewCard] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(column.title);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [newCardTitle, setNewCardTitle] = useState<string>('');


  // const onExpired = () => {
  //   navigation(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
  // };

  useEffect(() => {
    const isInputAdded = inputTitleRef && inputTitleRef.current;
    if (isInputAdded) {
      inputTitleRef.current.focus();
    }
  }, [isUpdateTitle]);

  column.cards.sort((a: CardType, b: CardType) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  const onUpdateColumn = (isDeleteColumn: boolean) => {
    setIsUpdateTitle(false);
    if (updateTitle === '') {
      setUpdateTitle(column.title);
      return;
    }
    // const columnRequest: ColumnRequest = {
    //   controller: CONTROLLER_TITLE_COLUMN,
    //   columnId: column.id,
    //   title: updateTitle,
    // };
    // onTitleColumnService(columnRequest).catch(() => onExpired());

    const coloumnUpdated = { ...column };
    coloumnUpdated.title = updateTitle;
    updateColumn(coloumnUpdated, isDeleteColumn);
  };

  const deleteCard = (cardId: string) => {
    let newColumn = { ...column };
    const indexOfCardDelete = newColumn.cards.findIndex((card) => card.id === cardId);
    newColumn.cards.splice(indexOfCardDelete, 1);

    updateColumn(newColumn, false);
  };

  const addNewCard = () => {
    setIsAddNewCard(false);
    if (newCardTitle === '') return;

    const newCardToAdd: CardType = {
      id: Date.now().toString(),
      boardId: column.boardId,
      title: newCardTitle.trim(),
      columnId: column.id,
      description: '',
      priority: '',
    };

    let newColumn = { ...column };
    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd.id);

    // const cardRequest: CardRequest = {
    //   controller: CONTROLLER_ADD_NEW_CARD,
    //   boardId: newCardToAdd.boardId,
    //   columnId: newCardToAdd.columnId,
    //   order: newColumn.cards.length - 1,
    //   title: newCardToAdd.title,
    //   cardId: newCardToAdd.id,
    //   description: '',
    //   priority: '',
    // };
    // addNewCardService(cardRequest).catch(() => onExpired);

    updateColumn(newColumn, false);
    setNewCardTitle('');
  };
  return (
    <div className="w-[272px] bg-[#ebecf0] rounded p-2 mr-4 shadow-lg">
      <header className="column-drag-handle font-semibold p-2 cursor-pointer underline">
        {!isUpdateTitle ? (
          <div className="grid grid-cols-10">
            <div className="col-span-9" onClick={() => setIsUpdateTitle(true)}>
              {updateTitle}
            </div>
            <GrClose
              onClick={() => {
                if (column.cards.length > 0) {
                  alert('Just only delete when have no card in column');
                  return;
                }
                confirmDelete(onUpdateColumn);
              }}
              className="mt-[2px] cursor-pointer hover:scale-110 transition-all"
              size={20}
            />
          </div>
        ) : (
          <input
            type="text"
            className="shadow block p-[3px]  w-full text-gray-900 bg-gray-50 rounded border-[1px] border-[#68589b] font-semibold"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            ref={inputTitleRef}
            onBlur={() => onUpdateColumn(false)}
          />
        )}
      </header>
      <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={'60vh'}>
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          dropPlaceholder={{
            // @ts-ignore
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview rounded-lg bg-[#bcb4d8] mb-2',
          }}
          dragClass="ease-[0.18s]"
          getChildPayload={(index) => column.cards[index]}
        >
          {column.cards.map((card, index) => (
            // @ts-ignore
            <Draggable key={card.id}>
              <Card card={card} key={card.id} deleteCard={deleteCard} order={index} />
            </Draggable>
          ))}
        </Container>
      </Scrollbars>

      {!isAddNewCard && (
        <div
          className="flex px-2 py-1 cursor-pointer hover:bg-[#C9CCD9] transition-all mt-1 border-t-[1.2px] border-[#68589b]"
          onClick={() => setIsAddNewCard(true)}
        >
          <AiOutlinePlus size={25} color="gray" className="pt-1" />
          <div className="text-gray-500 ml-1 pt-[2px] font-semibold">Add new card</div>
        </div>
      )}
      {isAddNewCard && (
        <div>
          <input
            type="text"
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-3"
            placeholder="Enter the tilte of this card"
            required
            autoFocus
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
          />
          <div className="grid grid-cols-10">
            <div className="flex col-span-9">
              <button
                className="bg-[#68589b] text-white rounded px-4 py-1.5 justify-start"
                onClick={addNewCard}
              >
                Add
              </button>
              <div className="pt-1 pl-3 cursor-pointer">
                <AiOutlineClose size={25} color="gray" onClick={() => setIsAddNewCard(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
