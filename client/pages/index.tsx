import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useEffect } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data) router.push('workspace');
  }, [data]);
  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </div>
      <div className="scale-x-100">
        <Header />
        <motion.div
          className="bg-office-home h-[90vh] bg-cover bg-center bg-fixed  pt-24"
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
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/workspace',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default Home;
