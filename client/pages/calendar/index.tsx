import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header';
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';

const Scheduler = dynamic(() => import('../../components/calendar/Scheduler'), {
  ssr: false,
});

const MyCalendar = () => {
  return (
    <div className="scale-x-100">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Scheduler />
      </motion.div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('session', session);

  if (!session) {
    return {
      redirect: {
        destination: '/authentication/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default MyCalendar;
