import React from 'react';
import Header from '../../components/header';
import dynamic from 'next/dynamic';

const DetailEvent = dynamic(() => import('./DetailEvent'), {
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

export default NewEvent;
