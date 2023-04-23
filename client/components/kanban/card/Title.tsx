import React, { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import axios from '../../../lib/axios';
import { CardType } from '../../../share/type/kanban';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
interface TitleProps {
  card: CardType;
}
const Title = ({ card: { title, _id, columnId,columnTitle } }: TitleProps) => {
  const text = useRef(title);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;
  };

  const handleBlur = async () => {
    if (title === text.current) return;
    // Update title of card
    const newTitle = text.current;
    if (!newTitle) {
      console.log('co gi sai sai');
    }

    // not update state
    await axios.patch(`/card/${_id}`, {
      title:newTitle,
      columnId,
      oldColumnId: columnId,
    });
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-1 items-center">
          <SubtitlesIcon />
          <ContentEditable
            html={text.current}
            onBlur={handleBlur}
            onChange={handleChange}
            className="px-2 py-1 w-full font-semibold"
          />
        </div>
        <div className='ml-9 inline-flex gap-1 font-light'>In list <p className='underline font-normal'>{columnTitle}</p></div>
      </div>
    </>
  );
};

export default Title;
