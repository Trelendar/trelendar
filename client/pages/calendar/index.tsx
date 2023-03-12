import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header';
import Scheduler from './Scheduler';

const MyCalendar = () => {
  return (
    <div className="scale-x-100">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Scheduler/>
      </motion.div>
    </div>
  );
};

export default MyCalendar;
