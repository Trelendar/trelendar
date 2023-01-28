import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header';

const Home: React.FC = () => {
  return (
    <div className="scale-x-100">
      <Header />
      <motion.div
        className="bg-office-home h-[90vh] bg-cover bg-center bg-fixed pt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-white text-6xl tracking-widest font-semibold uppercase pl-6">
          Welcome to Trelendar!
        </div>
        <div className="text-white text-4xl tracking-widest font-semibold uppercase pl-6 mt-7">
          Let&apos;s work together, try hard to get the best!
        </div>
        <div className="text-teal-200 text-3xl tracking-widest font-semibold uppercase pl-6 mt-7">
          getting started
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
