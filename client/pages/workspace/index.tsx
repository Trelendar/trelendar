import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BoardTag from './BoardTag';
import { BoardType } from '../../share/type';
import Header from '../../components/header';
import { boardsMock } from './mockBoards';

const Main: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>(boardsMock);

  return (
    <div className="scale-x-95">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <div className="max-h-[90vh] h-[90vh] overflow-y-auto rounded-md bg-[#BCB4D8] px-5">
          <div className="grid grid-cols-4 gap-8 pt-7">
            {boards.map((board) => (
              <BoardTag key={board.id} board={board} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
