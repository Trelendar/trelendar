import React from 'react';
import Header from '../../components/header';
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';

const DetailEvent = dynamic(() => import('../../components/calendar/DetailEvent'), {
  ssr: false,
});

const NewEvent = () => {
  return (
    <>
      <Header />
      <DetailEvent />
    </>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);

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
export default NewEvent;
