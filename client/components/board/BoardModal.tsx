import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { BoardType } from '../../share/type/kanban';
import Title from './Title';
const fetchCard = async (id: string) => {
  const res = await axios(`/board/${id}`);
  return res.data as BoardType;
};
const BoardModal = ({
  id,
  handleRefetchAllBoard,
}: {
  id: string;
  handleRefetchAllBoard: () => void;
}) => {
  const {
    data: board,
    isLoading,
    refetch,
  } = useQuery<BoardType>(['board', id], () => fetchCard(id), {});
  console.log('🚀 ~ file: BoardModal.tsx:15 ~ BoardModal ~ board:', board);
  const handleRefetchBoard = async () => {
    await refetch();
    await handleRefetchAllBoard();
  };
  if (isLoading) return <h1>loading</h1>;
  return (
    <div className="w-[700px] h-full grid grid-cols-3 gap-4 px-3">
      <div className="relative bg-white rounded-md col-span-3 py-4 px-6 flex flex-col gap-8">
        <Title board={board} handleRefetchBoard={handleRefetchBoard} />
      </div>
    </div>
  );
};

export default BoardModal;
