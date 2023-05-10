import React from 'react';
import Title from './Title';
import Members from './Members';
import Description from './Description';
import { MemberAction } from './MemberAction';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { CardType } from '../../../share/type/kanban';
const fetchCard = async (id: string) => {
  const res = await axios(`/card/${id}`);
  return res.data as CardType;
};
const CardModal = ({ id }: { id: string }) => {
  const {
    data: card,
    isLoading,
    refetch,
  } = useQuery<CardType>(['card', id], () => fetchCard(id), {
  });
  const handleRefetchCard = async () => {
    refetch();
  };
  if(isLoading) return <h1>loading</h1>
  return (
    <div className="w-[900px] h-full grid grid-cols-3 gap-4 px-3">
      <div className="relative bg-white rounded-md col-span-2 py-4 px-6 flex flex-col gap-8">
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
      <MemberAction card={card} handleRefetchCard={handleRefetchCard} />
    </div>
  );
};

export default CardModal;
