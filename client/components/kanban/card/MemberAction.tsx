import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

export const MemberAction = () => {
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
        <div className="relative inset-0 bg-white rounded-md shadow-md p-4 max-h-screen flex flex-col items-center">
          <h2 className="text-sm font-normal mb-4">Members</h2>
          <p className="text-gray-700">Modal content goes here...</p>
        </div>
      )}
    </div>
  );
};
