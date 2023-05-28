import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { queryClient } from '../../../pages/_app';
import axios from '../../../lib/axios';
const fetchComments = async (key: string, cardId: string) => {
  const response = await axios(`comment/${cardId}`);
  const data = await response.data;
  return data;
};

export const useRealTimeComments = (cardId: string) => {
  const [socket, setSocket] = useState(null);

  // Create a WebSocket connection on mount
  useEffect(() => {
    const newSocket = io(process.env.URL_SOCKET, { transports: ['websocket'] });

    newSocket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    setSocket(newSocket);

    return () => {
      if (newSocket.readyState === 1) {
        // <-- This is important
        newSocket.close();
      }
    };
  }, [cardId]);

  // Subscribe to WebSocket channel and update useQuery cache on new comment
  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { cardId });

      socket.on('newComment', (comment) => {
        queryClient.setQueryData(['comments', cardId], (prevComments: any[]) => {
          return [comment, ...prevComments];
        });
      });
      socket.on('deleteComment', (idDeleted) => {
        queryClient.setQueryData(['comments', cardId], (prevComments: any[]) => {
          return [...prevComments.filter((comment) => comment._id !== idDeleted)];
        });
      });
    }
  }, [socket]);

  // Fetch comments using useQuery
  const { data: comments } = useQuery(['comments', cardId], () => fetchComments(cardId, cardId));

  return comments;
};
