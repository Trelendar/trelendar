import React, { useEffect, useState } from 'react';
import Title from './Title';
import Members from './Members';
import Description from './Description';
import { MemberAction } from './MemberAction';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CardType } from '../../../share/type/kanban';
import Comment from './Comment';
import Swal from 'sweetalert2';
const fetchCard = async (id: string) => {
  const res = await axios(`/card/${id}`);
  return res.data as CardType;
};
const CardModal = ({
  id,
  closeModal,
  deleteCard,
}: {
  id: string;
  closeModal: () => void;
  deleteCard: (a: string) => void;
}) => {
  const {
    data: card,
    isLoading,
    refetch,
  } = useQuery<CardType>(['card', id], () => fetchCard(id), {});
  const handleRefetchCard = async () => {
    refetch();
  };
  const handleDeleteCard = async () => {
    if (card.members.length) {
      Swal.fire('Please remove all member to delete card', '', 'info');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this card!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete the item
        await axios.delete(`card/${id}`);
        deleteCard(id);
        closeModal();
      }
    });
  };

  if (isLoading) return <h1>loading</h1>;
  return (
    <>
      <div className="absolute right-1 top-1 cursor-pointer hover:opacity-70">
        <RemoveCircleIcon onClick={handleDeleteCard} />
      </div>
      <div className="w-[900px] h-full grid grid-cols-3 gap-4 px-3">
        <div className="relative bg-white rounded-md col-span-2 py-4 px-6 flex flex-col gap-8">
          <Title card={card} />
          <Members card={card} />
          <Description card={card} />
        </div>
        <MemberAction card={card} handleRefetchCard={handleRefetchCard} />
      </div>
      <Comment card={card} handleRefetchCard={handleRefetchCard} />
    </>
  );
};

export default CardModal;
