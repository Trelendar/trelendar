import React, { useEffect, useState } from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image';
import { getSession, signOut, useSession } from 'next-auth/react';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { data } = useSession();

  const [isDropdonw, setIsDropdonw] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    data &&
      !localStorage.getItem('accessToken') &&
      localStorage.setItem('accessToken', data.token as string);
  }, [data]);

  return (
    <nav className="grid grid-cols-7 gap-4 bg-colorHome py-2 max-h-17 h-[10vh]">
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
            <span className="text-white text-lg flex">{data?.user.name}</span>
          </div>
          <div className="col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div
              onClick={() => {
                localStorage.removeItem('accessToken');
                signOut();
              }}
            >
              <div className="bg-white transition text-colorHome font-semibold py-2 px-8 border rounded-full hover:opacity-75 cursor-pointer">
                Log out
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link href="/authentication/sign-in">
            <div className="bg-transparent transition text-white font-semibold py-2 px-10 border border-white-500 rounded-full hover:bg-white hover:text-colorHome cursor-pointer">
              Login
            </div>
          </Link>
        </div>
      )}

      {data && (
        <div className="col-start-7 pt-6">
          <div className="relative inline-block text-left">
            <div>
              <button
                className="inline-flex w-full justify-center px-2 pr-3 py-1 pt-[0.4rem] text-sm hover:scale-125 transition"
                onClick={() => setIsDropdonw(!isDropdonw)}
              >
                <svg className="-mr-1 ml-2 h-7 w-7" viewBox="0 0 30 30">
                  <FiSettings size={30} color="white" />
                </svg>
              </button>
            </div>
          </div>
          <div className={'dropdown-fullname divide-y ' + (!isDropdonw ? 'hidden' : '')}>
            <div className="py-1" onClick={() => router.push('/workspace')}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100">
                My projects
              </div>
            </div>
            <div className="py-1" onClick={() => router.push('/calendar')}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100">
                My calendar
              </div>
            </div>

            <div className="py-1">
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Header;
