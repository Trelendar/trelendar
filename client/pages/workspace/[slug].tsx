import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header';
import Kanban from '../../components/kanban';
import { getSession } from 'next-auth/react';

const Board: React.FC = () => {
  return (
    <div className="scale-x-100">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <div className="max-h-90vh] h-[90vh] overflow-y-auto bg-[#BCB4D8]">
          <Kanban />
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
export default Board;
