import React from 'react';
import { BoardType } from '../../share/type';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  board: BoardType;
}

const BoardTag: React.FC<Props> = (props) => {
  const { board } = props;

  return (
    <div className=" col-span-1 max-w-[300px] bg-white rounded-lg border border-gray-200 shadow-md ">
      <div>
        <img
          className="rounded-t-lg"
          src="https://cdn.vietnambiz.vn/2019/10/27/kanban-project-management-15721743128351256247490.png"
          alt="kanban"
        ></img>
      </div>
      <div className="p-5 pt-1">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {board.boardName}
          </h5>
        </div>
        <Link href={`workspace/${board.id}`}>
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
