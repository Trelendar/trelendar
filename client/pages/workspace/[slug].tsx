import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header';
import Kanban from '../../components/kanban';

const Board: React.FC = () => {
  return (
    <div className="scale-x-95">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <div className="max-h-[85vh] h-[85vh] overflow-y-auto rounded-md bg-[#BCB4D8]">
          <Kanban/>
        </div>
      </motion.div>
    </div>
  );
};

export default Board;
