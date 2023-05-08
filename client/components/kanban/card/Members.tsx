import React from 'react';
import { CardType } from '../../../share/type/kanban';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

const Members = ({ card }: { card: CardType }) => {
  if (!card.members.length) return;
  return (
    <div className="flex flex-col ml-8 items-start">
      <p>Members</p>
      <AvatarGroup max={4}>
        {card.members.map((member) => (
          <Tooltip title={member.name}>
            <Avatar src={member.image} alt={member.name} />
          </Tooltip>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default Members;
