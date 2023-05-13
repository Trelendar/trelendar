import React, { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import axios from '../../lib/axios';
import { BoardType } from '../../share/type/kanban';
import Background from './Background';
interface TitleProps {
  board: BoardType;
  handleRefetchBoard: () => void;
}
const Title = ({ board, handleRefetchBoard }: TitleProps) => {
  const { name, _id, background } = board;
  const text = useRef(name);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;
  };

  const handleBlur = async () => {
    if (name === text.current) return;
    // Update title of card
    const newTitle = text.current;
    if (!newTitle) {
      console.log('co gi sai sai');
    }

    // not update state
    const res = await axios.patch(`/board/${_id}`, {
      name: newTitle,
    });
    if (res) {
      await handleRefetchBoard();
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-1 items-center mb-3">
          <p>Name:</p>
          <ContentEditable
            html={text.current}
            onBlur={handleBlur}
            onChange={handleChange}
            className="px-2 py-1 w-full font-semibold"
          />
        </div>
        <Background board={board}  handleRefetchBoard={handleRefetchBoard}/>
      </div>
    </>
  );
};

export default Title;
