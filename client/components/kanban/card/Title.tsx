import React, { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import axios from '../../../lib/axios';
import { CardType } from '../../../share/type/kanban';
interface TitleProps {
  card: CardType;
}
const Title = ({ card: { title, _id, columnId } }: TitleProps) => {
  const text = useRef(title);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;
  };

  const handleBlur = async () => {
    // Update title of card
    const title = text.current;
    if (!title) {
      console.log('co gi sai sai');
    }
    await axios.patch(`/card/${_id}`, {
      title,
      columnId,
      oldColumnId: columnId,
    });
  };
  return (
    <div className="py-4 px-6 rounded-t border-b">
      <ContentEditable html={text.current} onBlur={handleBlur} onChange={handleChange} />
    </div>
  );
};

export default Title;
