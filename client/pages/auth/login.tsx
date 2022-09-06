import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getProviders, getSession, getCsrfToken } from 'next-auth/react';
const User: React.FC = () => {
  const { data } = useSession();
  return (
    <div className="flex justify-center my-8">
      <div className="w-96 justify-center border boder-cyan-50 shadow-md p-6">
        <h1 className="text-green-700 text-xl font-medium mb-4 text-center">
          Login to Trelendar
          <br />
          {JSON.stringify(data)}
        </h1>
        <button onClick={async () => await signOut()}>Sign OUT</button>
        <input
          type="text"
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Email"
          required
        />
        <input
          type="text"
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password"
          required
        />
        <button
          className="bg-green-500 mb-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={() => signIn()}
        >
          Login
        </button>
        <div className="text-center mb-4">OR</div>
        <button
          className="flex justify-center bg-slate-50 mb-4  w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-md"
          onClick={() => {
            signIn('google');
          }}
        >
          <FcGoogle size={25} />
          <span className="justify-between ml-1">Continue to Google</span>
        </button>
        <button
          className="flex justify-center bg-slate-50  mb-4 w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-md"
          onClick={() => {
            signIn('facebook');
          }}
        >
          <FaFacebook size={25} color={'#17357B'} />
          <span className="justify-between ml-1">Continue to Facebook</span>
        </button>
        <div className="w-full p-line bg-gray-300 my-8"></div>
        <div className="grid grid-cols-2 divide-x mb-2 ">
          <div className="cursor-pointer text-cyan-600 hover:underline">Forgot password</div>
          <div className="cursor-pointer text-cyan-600 hover:underline">Sign up for an account</div>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   return {
//     props: {
//       providers: await getProviders(),
//       session: await getSession(context),
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// };
export default User;
