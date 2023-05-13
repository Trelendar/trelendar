import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from '../../../lib/axios';

interface InputCommentProps {
  cardId: string;
  handleRefetchCard: () => void;
}
const InputComment = ({ cardId, handleRefetchCard }: InputCommentProps) => {
  console.log('🚀 ~ file: InputComment.tsx:12 ~ InputComment ~ cardId:', cardId);
  const [body, setBody] = useState('');

  const handlePostComment = async () => {
    console.log('🚀 ~ file: InputComment.tsx:12 ~ InputComment ~ body:', body);
    if (body === '') {
      swal('Please write somethings');
      return;
    }
    const res = await axios.post('/comment', {
      content: body,
      cardId,
    });
    if (!res.data) return;
    // const { success, message } = res.data.addComment;
    if (res) {
      setBody('');
      await handleRefetchCard();
      return;
    }
    // swal(message, '', 'warning');
    // navigate('/');
  };

  return (
    <div className="border">
      <div className="">
        <textarea
          name="comment"
          className="w-full max-h-24 p-3"
          rows={4}
          cols={50}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment ..."
        ></textarea>
      </div>
      <div className="w-full bg-[#ccc] px-4 py-2 flex justify-between items-center">
        <div className="flex gap-3 items-center py-2">
          {/* <Avatar src={user.image} alt="" className="w-6 h-6 rounded-[50%]" /> */}
        </div>
        <div>
          <button
            className="bg-primary text-white text-sm font-bold px-2 py-1 rounded-md"
            onClick={() => handlePostComment()}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputComment;
