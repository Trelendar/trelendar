import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}
const fetchMember = async (id: string) => {
  const res = await axios.get(`/board/${id}/members`);
  return res.data as User[];
};
const Member = ({ user }: { user: User }) => {
  return (
    <div className="text-[#172b4d] bg-[#ffffff] p-1 text-sm flex items-center min-w-[180px] gap-1 mx-2 cursor-pointer hover:bg-[#091e4224] rounded">
      <Avatar className="!w-6 !h-6" alt={user.name} src={user.image} />
      <span className="flex">{user.name}</span>
    </div>
  );
};
export const MemberAction = () => {
  const router = useRouter();
  const { data: users } = useQuery<User[]>(['member', router.query.slug], () =>
    fetchMember(router.query.slug as string)
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((pre) => !pre);
  return (
    <div>
      <span>Add to card</span>
      <div
        className="flex items-center gap-1 bg-[#091e420f] rounded-md cursor-pointer p-1 hover:opacity-80"
        onClick={toggle}
      >
        <PersonIcon />
        <span className="text-base">Members</span>
      </div>
      {isOpen && (
        <div className="relative inset-0 bg-white rounded-md shadow-md p-4 max-h-screen flex flex-col items-center min-w-[180px] z-10">
          <h2 className="text-sm font-normal mb-4">Members</h2>
          {users.map((user) => (
            <Member user={user} />
          ))}
          <p className="text-gray-700">Modal content goes here...</p>
        </div>
      )}
    </div>
  );
};
