// import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';
const DisplayDate = ({ date, title }: { date: Date; title?: string }) => {
  return (
    <p className="text-[#757575] text-sm">
      <dfn className="not-italic" title={moment(date).format('LLLL')}>
        {title}
        {moment(date).calendar()}
      </dfn>
    </p>
  );
};
const DisplayDateComment = ({ date }: { date: Date }) => {
  const [time, setTime] = useState(moment(date).fromNow());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment(date).fromNow());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="text-gray text-sm not-italic">
      <dfn title={moment(date).format('LLLL')} className="not-italic">
        {time}
      </dfn>
    </p>
  );
};
// import { DeleteCommentMutation } from "../../graphql/mutations";
// import { GET_COMMENT } from "../../graphql/queries";
// import { COMMENTS_SUBSCRIPTION } from "../../graphql/subscriptions";
// import { DeleteComment, DeleteCommentProps, GetComment } from '../../graphql/types';
// import { userSelector } from '../../store/reducers/userSlice';
// import DisplayDate, { DisplayDateComment } from '../utils/DisplayDate';
import InputComment from './InputComment';
import { CardType } from '../../../share/type/kanban';
import { useSession } from 'next-auth/react';
import axios from '../../../lib/axios';

interface CommentProps {
  card: CardType;
  handleRefetchCard: () => void;
}
interface CommentAdded {
  commentAdded: {
    code: number;
    success: boolean;
    message: string;
    type: string;
    comment: {
      body: string;
      author: {
        username: string;
        image: string;
      };
      _id: string;
      createdAt: Date;
    };
  };
}
interface Comment {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    name: string;
    image: string;
  };
  content: string;
}
const Comment = ({ card, handleRefetchCard }: CommentProps) => {
  const { data: user } = useSession();

  const { comments: listComments } = card;
  if (!listComments) return null;

  const handleDelete = async (id: string) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this comment!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`/comment/${id}`);
        await handleRefetchCard();
        // await deleteComment({ variables: { idCmt: id, slug } });
      }
    });
  };

  //   const subComment = useSubscription<CommentAdded, { slug: string }>(COMMENTS_SUBSCRIPTION, {
  //     variables: { slug },
  //   });

  //   useEffect(() => {
  //     const { data } = subComment;

  //     if (data && data.commentAdded.type === 'add') {
  //       setListComments((pre) => [data.commentAdded.comment, ...pre]);
  //       setCoutComment((pre) => pre + 1);
  //     }
  //     if (data && data.commentAdded.type === 'rm') {
  //       const idRemove = data.commentAdded.comment._id;
  //       setListComments((pre) => [...pre.filter((pre) => pre._id !== idRemove)]);
  //       setCoutComment((pre) => pre - 1);
  //     }
  //   }, [subComment.data]);

  return (
    <div className="my-3 px-4 w-full">
      {/* <h3 className="text-2xl text-center font-semibold mb-3">{listComments.length} Reponses</h3> */}

      <InputComment cardId={card._id} handleRefetchCard={handleRefetchCard} />
      <div className="mt-3 h-24">
        {listComments.length > 0 && (
          <Paper style={{ padding: '40px 20px'}} >
            {listComments?.map((comment) => (
              <div key={comment._id}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.author.image} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <span className="m-0 text-left font-semibold text-xl hover:underline">
                      {comment.author.name}
                    </span>
                    <Typography
                      sx={{
                        textAlign: 'left',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {comment.content}
                    </Typography>
                    <DisplayDateComment date={comment.createdAt} />
                  </Grid>
                  <Grid justifyContent="center" alignItems="center">
                    {user.userId === comment.author._id && (
                      <div onClick={() => handleDelete(comment._id)}>
                        <p className="cursor-pointer text-red-500">
                          <BsFillTrashFill />
                        </p>
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
              </div>
            ))}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Comment;
