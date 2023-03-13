import React from 'react';
import { BoardType } from '../../share/type';
import Link from 'next/link';
import Image from 'next/image';
import { Board } from '.';

interface Props {
  board: Board;
}

const BoardTag: React.FC<Props> = ({ board }) => {
  return (
    <div className=" col-span-1 max-w-[300px] bg-white rounded-lg border border-gray-200 shadow-md ">
      <div>
        <Image
          className="rounded-t-lg"
          src={board.background}
          loader={() => board.background}
          alt="kanban"
          height={300}
          width={300}
        />
      </div>
      <div className="p-5 pt-1">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{board.name}</h5>
        </div>
        <Link href={`workspace/${board._id}`}>
          <div className="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#68589B] rounded-lg hover:bg-[#48367F] focus:ring-4 transition-all">
            Detail
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BoardTag;
