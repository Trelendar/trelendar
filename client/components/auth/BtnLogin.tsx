import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  provider: string;
  icon: React.ReactNode;
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const BtnLogin = ({ provider, icon }: Props) => {
  const router = useRouter();
  return (
    <button
      className="flex justify-center bg-slate-50 mb-4  w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-md"
      onClick={async () => {
        const from = router.query.from;
        console.log('🚀 ~ file: BtnLogin.tsx:19 ~ from:', from);
        const decodedFrom = decodeURIComponent(from as string);
        console.log('🚀 ~ file: BtnLogin.tsx:20 ~ onClick={ ~ decodedFrom:', decodedFrom);
        if (from) await signIn(provider, { callbackUrl: decodedFrom });
        else await signIn(provider, { redirect: true });
      }}
    >
      {icon}
      <span className="justify-between ml-1">Continue to {capitalizeFirstLetter(provider)}</span>
    </button>
  );
};
export default BtnLogin;
