import React, { useState } from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image';
import { getSession, signOut, useSession } from 'next-auth/react';
import { Avatar } from '@mui/material';
const Header: React.FC = () => {
  const { data } = useSession();
  const isLogin = false;
  //   const handleLogout = () => {
  //     logout({ username, controller: CONTROLLER_LOGOUT })
  //       .then(() => {
  //         dispatch(logoutLocal());
  //         navigation(`../${appRouters.LINK_TO_HOME_PAGE}`);
  //       })
  //       .catch((err) => {
  //         dispatch(logoutLocal());
  //         navigation(`../${appRouters.LINK_TO_HOME_PAGE}`);
  //       });
  //   };

  const [isDropdonw, setIsDropdonw] = useState<boolean>(false);
  return (
    <nav className="grid grid-cols-7 gap-4 bg-colorHome p-6 mb-1 rounded-md max-h-17 h-[10vh]">
      <Link href="workspace" className="col-span-1 ">
        <div className="flex items-center text-white transition hover:scale-105">
          <BsFillKanbanFill className="mr-3" size={30} />
          <span className="font-semibold text-xl tracking-tight">Trelendar</span>
        </div>
      </Link>

      {/* {JSON.stringify(data?.user.image)} */}
      {data ? (
        <>
          <div className="flex items-center gap-3">
            <Avatar src={data?.user.image} />
            <span>{data?.user.name}</span>
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

      {isLogin && (
        <div className="col-start-7">
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
          <div className={'dropdown-fullname divide-y ' + (!isDropdonw ? 'hidden' : '')}></div>
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
