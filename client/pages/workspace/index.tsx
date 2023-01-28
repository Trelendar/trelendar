import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BoardTag from './BoardTag';
import { BoardType } from '../../share/type';
import Header from '../../components/header';
import { boardsMock } from './mockBoards';
import { getSession } from 'next-auth/react';

const Main: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>(boardsMock);

  return (
    <div className="scale-x-100">
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
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default Main;
