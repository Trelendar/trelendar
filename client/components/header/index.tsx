import React, { useState } from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image';

const Header: React.FC = () => {
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
      <Link href='workspace' className="col-span-1 ">
        <div className="flex items-center text-white transition hover:scale-105">
          <BsFillKanbanFill className="mr-3" size={30} />
          <span className="font-semibold text-xl tracking-tight">Trelendar</span>
        </div>
      </Link>

      {!isLogin && (
        <div className="col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link href='/auth/login'>
            <div className="bg-transparent transition text-white font-semibold py-2 px-10 border border-white-500 rounded-full hover:bg-white hover:text-colorHome">
              Login
            </div>
          </Link>
        </div>
      )}

      {/* {!isLogin && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link href='sign'>
            <div className="bg-white transition text-colorHome font-semibold py-2 px-8 border rounded-full hover:scale-95">
              Sign Up
            </div>
          </Link>
        </div>
      )} */}

      {isLogin && (
        <div className="user-fullname w-[335px] h-[44px] overflow-clip col-start-5 col-end-7 pt-1">
          <Image
            className="p-1 w-9 h-9 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 inline-block mr-2"
            src="https://media.istockphoto.com/vectors/three-persons-icon-black-vector-vector-id1158561473?k=20&m=1158561473&s=612x612&w=0&h=pSRNS3mkeYMYcleK_Pzf89gnkVQuxtiSGMm4yll-UXg="
            alt="Bordered avatar"
          ></Image>
          Long
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
          {/* <div className={'dropdown-fullname divide-y ' + (!isDropdonw ? 'hidden' : '')}>
            <div className="py-1" onClick={() => navigation(`/${appRouters.LINK_TO_MAIN_PAGE}`)}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100">
                My projects
              </div>
            </div>
            <div className="py-1" onClick={() => navigation(`/${appRouters.LINK_TO_PROFILE_PAGE}`)}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100">
                My profile
              </div>
            </div>
            <div className="py-1" onClick={() => navigation(`/${appRouters.LINK_TO_USER_LIST}`)}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100">
                All users
              </div>
            </div>
            <div className="py-1" onClick={() => handleLogout()}>
              <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                Logout
              </div>
            </div>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Header;
