import React, { useState, useRef, useEffect } from 'react';
import { CardRequest, CardType } from '../../../share/type/kanban';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import ContentEditable from 'react-contenteditable';
import { InputUnstyled } from '@mui/base';
import Title from './Title';
import { confirmDeleteCard } from '../utils';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import Description from './Description';
import { MemberAction } from './MemberAction';
// import purify from 'dompurify';
interface Props {
  card: CardType;
  deleteCard: (cardId: string) => void;
  order: number;
}

const Card: React.FC<Props> = (props) => {
  console.log('🚀 ~ file: index.tsx:15 ~ card:', props.card);
  const { deleteCard, order } = props;

  const [card, setCard] = useState<CardType>(props.card);
  console.log("🚀 ~ file: index.tsx:25 ~ card:", card)
  const [isModal, setIsModal] = useState<boolean>(false);
  const titleUpdateRef = useRef(card.title ?? '');
  const priorityUpdateRef = useRef(card.priority ?? '');
  const descriptionUpdateRef = useRef(card.description ?? '');
  const handleOnchangeMember=()=>{}

  //   const onExpired = () => {
  //     dispatch(logoutLocal());
  //     navigate(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
  //   };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
    },
  };

  useEffect(() => {
    if (!isModal) return;
    // getSingleCard(card.boardId, card.id)
    //   .then((res) => {
    //     titleUpdateRef.current = res.data.card?.title ?? '';
    //     priorityUpdateRef.current = res.data.card?.priority ?? '';
    //     descriptionUpdateRef.current = res.data.card?.description ?? '';
    //     setCard(res.data.card ?? card);
    //   })
    //   .catch(() => onExpired());
  }, [isModal]);

  const closeModal = () => {
    // const cardRequest: CardRequest = {
    //   controller: CONTROLLER_UPDATE_CARD,
    //   cardId: card.id,
    //   boardId: card.boardId,
    //   title: titleUpdateRef.current,
    //   priority: priorityUpdateRef.current,
    //   description: descriptionUpdateRef.current,
    // };
    setCard({
      ...card,
      title: titleUpdateRef.current,
      priority: priorityUpdateRef.current,
      description: descriptionUpdateRef.current,
    });
    // updateCardService(cardRequest).catch(() => onExpired);

    setIsModal(false);
  };

  const onDeleteCard = () => {
    deleteCard(card.id);

    // const cardRequest: CardRequest = {
    //   controller: CONTROLLER_DELETE_CARD,
    //   boardId: card.boardId,
    //   cardId: card.id,
    //   columnId: card.columnId,
    //   order: order,
    // };
    // deleteCardService(cardRequest).catch(() => onExpired());
  };
  return (
    <>
      <article
        onClick={() => setIsModal(true)}
        className="bg-white shadow shadow-slate-400 mb-2 rounded-md p-2 w-64 break-all cursor-pointer hover:opacity-70"
      >
        {card.title}
      </article>
      <Modal isOpen={isModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
        <div className="w-[900px] h-full grid grid-cols-5 gap-4 px-3">
          <div className="relative bg-white rounded-md col-span-4 py-4 px-6 flex flex-col gap-8">
            {/* <button
                type="button"
                onClick={closeModal}
                className="transition-all absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <GrClose />
              </button> */}
            <Title card={card} />
            <Description card={card} />
            {/* <div className="px-6 py-2">
                <ul className="my-4 space-y-3">
                  <li className="w-[300px]">
                    <div className="flex items-center text-base font-bold text-gray-900">
                      <span className="flex-1 whitespace-nowrap">Priority:</span>
                      <ContentEditable
                        className="inline-flex items-center justify-center px-3 py-1 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded"
                        html={priorityUpdateRef.current}
                        onChange={(e) => {
                          if (e.target.value === '') return;
                          priorityUpdateRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="p-3 text-base  text-gray-900  rounded-lg  group">
                      <div className="flex-1 ml-3 break-words font-bold">Description:</div>
                      <InputUnstyled type="" />
                      <ContentEditable
                        className="flex-2 ml-3 break-words text-sm py-2"
                        html={descriptionUpdateRef.current}
                        onChange={(e) => {
                          if (e.target.value === '') return;
                          descriptionUpdateRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="items-center p-3 text-base  text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow">
                      <div className="ml-3 font-bold">Member:</div>
                      <div className="ml-3"><MemberTag cardId={card.id} /></div>
                    </div>
                  </li>
                  <li className="flex justify-around">
                    <p className="text-xs italic font-normal text-gray-500 pt-4 tracking-wide">
                      ( *Click any fields to update )
                    </p>
                    <button
                      className="transition-all bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => confirmDeleteCard(onDeleteCard)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div> */}
          </div>
          <MemberAction/>
        </div>
      </Modal>
    </>
  );
};

export default Card;
