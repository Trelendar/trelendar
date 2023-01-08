import React, { useState } from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image';
import { getSession, signOut, useSession } from 'next-auth/react';
import { Avatar } from '@mui/material';
const Header: React.FC = () => {
  const { data } = useSession();
  return (
    <nav className="grid grid-cols-7 gap-4 bg-colorHome p-6 max-h-17 h-[10vh]">
      <Link href="" className="col-span-1 ">
        <div className="flex items-center text-white transition hover:scale-100 cursor-pointer">
          <BsFillKanbanFill className="mr-3" size={30} />
          <span className="font-semibold text-xl tracking-tight">Trelendar</span>
        </div>
      </Link>
      {data ? (
        <>
          <div className="flex items-center gap-3">
            <Avatar src={data?.user.image} />
            <span className="text-white text-lg">{data?.user.name}</span>
          </div>
          <div className="col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div onClick={() => signOut()}>
              <div className="bg-white transition text-colorHome font-semibold py-2 px-8 border rounded-full hover:opacity-75 cursor-pointer">
                Log out
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link href="/auth/login">
            <div className="bg-transparent transition text-white font-semibold py-2 px-10 border border-white-500 rounded-full hover:bg-white hover:text-colorHome cursor-pointer">
              Login
            </div>
          </Link>
        </div>
      )}
    </nav>
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
export default Header;
