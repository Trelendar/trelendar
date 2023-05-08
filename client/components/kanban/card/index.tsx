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
import Members from './Members';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
// import purify from 'dompurify';
interface Props {
  card: CardType;
  deleteCard: (cardId: string) => void;
  order: number;
}
const fetchCard = async (id: string) => {
  const res = await axios(`/card/${id}`);
  return res.data as CardType;
};
const Card: React.FC<Props> = (props) => {
  const { deleteCard, order } = props;

  // const [card, setCard] = useState<CardType>(props.card);
  const { data: card, isLoading } = useQuery<CardType>(['card', props.card._id], () =>
    fetchCard(props.card._id)
  );
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOnchangeMember = () => {};

  if (isLoading) return <h1>loading</h1>;
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

  // useEffect(() => {
  //   if (!isModal) return;
  //   // getSingleCard(card.boardId, card.id)
  //   //   .then((res) => {
  //   //     titleUpdateRef.current = res.data.card?.title ?? '';
  //   //     priorityUpdateRef.current = res.data.card?.priority ?? '';
  //   //     descriptionUpdateRef.current = res.data.card?.description ?? '';
  //   //     setCard(res.data.card ?? card);
  //   //   })
  //   //   .catch(() => onExpired());
  // }, [isModal]);

  const closeModal = () => {
    // const cardRequest: CardRequest = {
    //   controller: CONTROLLER_UPDATE_CARD,
    //   cardId: card.id,
    //   boardId: card.boardId,
    //   title: titleUpdateRef.current,
    //   priority: priorityUpdateRef.current,
    //   description: descriptionUpdateRef.current,
    // };
    // setCard({
    //   ...card,
    //   title: titleUpdateRef.current,
    //   priority: priorityUpdateRef.current,
    //   description: descriptionUpdateRef.current,
    // });
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
            <Members card={card} />
            <Description card={card} />
          </div>
          <MemberAction card={card} />
        </div>
      </Modal>
    </>
  );
};

export default Card;
