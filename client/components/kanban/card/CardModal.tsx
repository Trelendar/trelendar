import React from 'react';
import Title from './Title';
import Members from './Members';
import Description from './Description';
import { MemberAction } from './MemberAction';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { CardType } from '../../../share/type/kanban';
import Comment from './Comment';
const fetchCard = async (id: string) => {
  const res = await axios(`/card/${id}`);
  return res.data as CardType;
};
const CardModal = ({ id }: { id: string }) => {
  const {
    data: card,
    isLoading,
    refetch,
  } = useQuery<CardType>(['card', id], () => fetchCard(id), {});
  console.log('🚀 ~ file: CardModal.tsx:19 ~ CardModal ~ card:', card);
  const handleRefetchCard = async () => {
    refetch();
  };
  if (isLoading) return <h1>loading</h1>;
  return (
    <div className="w-[900px] h-full grid grid-cols-3 gap-4 px-3">
      <div className="relative bg-white rounded-md col-span-2 py-4 px-6 flex flex-col gap-8">
        <Title card={card} />
        <Members card={card} />
        <Description card={card} />
        <Comment card={card} />
      </div>
      <MemberAction card={card} handleRefetchCard={handleRefetchCard} />
    </div>
  );
};

export default CardModal;
