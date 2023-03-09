import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BoardTag from './BoardTag';
import { BoardType } from '../../share/type';
import Header from '../../components/header';
import { boardsMock } from './mockBoards';
import { getSession } from 'next-auth/react';
import { BsPlusLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';
interface Board {
  background: string;
}
const Main: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>(boardsMock);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>('');
  const { data, isLoading } = useQuery<Board[]>({
    queryKey: ['board'],
    queryFn: async () => {
      return await axios.get('board');
    },
  });
  console.log(data);

  const router = useRouter();

  const onInputTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = evt.target.value;
    setTitle(newTitle);
  };

  const onSaveChanges = async () => {
    await axios.post('/board', {
      name: 'test2',
      members: [],
      background: 'vcc',
    });
    if (title.length === 0) return;
    router.push(`/workspace/${title}`);
  };
  if (isLoading) return <></>;
  return (
    <div className="scale-x-100">
      <Header />
      <motion.div initial={{ x: '-100px', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <div className="max-h-[90vh] h-[90vh] overflow-y-auto rounded-md bg-[#BCB4D8] px-5">
          <button
            className="text-white font-bold uppercase text-sm px-4 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-1"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <BsPlusLg />
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[450px] my-6 mx-auto">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold text-[#919bab]">Create Board</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <span className="my-4 text-slate-500 text-lg leading-relaxed">
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Board title
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(evt) => onInputTitle(evt)}
                          />
                        </div>
                      </span>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-[#BCB4D8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={onSaveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <div className="grid grid-cols-4 gap-8 pt-3">
            {/* {boards.map((board) => (
              <BoardTag key={board.id} board={board} />
            ))} */}
            {data.map((item, index) => {
              return <span key={index}>{item.background}</span>;
            })}
          </div>
        </div>
      </motion.div>
    </div>
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
export default Main;
