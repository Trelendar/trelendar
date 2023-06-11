import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import axios from '../../lib/axios';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

interface InviteInfo {
  inviteBy: string;
  member: number;
  name: string;
}
const fetchInfoInvite = async (token: string): Promise<InviteInfo> => {
  if (!token) return;
  const response = await axios(`board/invite?token=${token}`);
  return response.data;
};
const joinBoard = async (token: string): Promise<any> => {
  if (!token) return;
  const response = await axios.post(`board/join?token=${token}`);
  return response.data;
};
const NotValidTokenInvite = (
  <div className="flex items-center justify-center h-screen">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Invalid token!</strong>
      <span className="block sm:inline">
        The invite token you entered is not valid. Please check the token and try again.
      </span>
    </div>
  </div>
);
const Invite = () => {
  const router = useRouter();
  const { data: user } = useSession();
  const { token } = router.query;
  const { data, isError, isLoading } = useQuery<InviteInfo>(['invite', token], () =>
    fetchInfoInvite(token as string)
  );
  useEffect(() => {
    user &&
      !localStorage.getItem('accessToken') &&
      localStorage.setItem('accessToken', user.token as string);
  }, [user]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) return NotValidTokenInvite;
  const { inviteBy, member, name } = data;
  const handleJoin = async () => {
    if (!user) {
      const from = `${process.env.NEXTAUTH_URL}/invite?token=${token}`;
      const encodeFrom = encodeURIComponent(from);
      console.log("🚀 ~ file: index.tsx:57 ~ handleJoin ~ process.env.NEXTAUTH_URL:", process.env.NEXTAUTH_URL)
      router.push(`authentication/sign-in?from=${encodeFrom}`);
      Swal.fire('', 'You need to login to join this workspace', 'info');
      return;
    }
    const res = await joinBoard(token as string);
    router.push(`/workspace/${res._id}`);
    Swal.fire('Joined', 'You has been joined the board', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">You're invited by {inviteBy}!</h2>
        <p className="mb-4">Your team are waiting you.</p>
        <p className="text-lg font-bold mb-4">Workspace name: {name}</p>
        <p className="mb-4">Member number: {member}</p>
        {!user && <p className="mb-4">You need to login to join workspace</p>}
        <button
          onClick={handleJoin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Invite;
