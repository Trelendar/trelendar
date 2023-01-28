import React, { useEffect, useState } from 'react';
import { Tag, UserCard } from '../../share/type';
import { WithContext as ReactTags } from 'react-tag-input';

interface Props {
  cardId: string;
}

const MemberTag: React.FC<Props> = (props) => {
  const { cardId } = props;

  const [tags, setTags] = useState<Tag[]>([
    {
      id: '1',
      text: 'Long',
    },
    {
      id: '2',
      text: 'Hoang',
    },
  ]);
  const [users, setUsers] = useState<Tag[]>([
    {
      id: '1',
      text: 'Long',
    },
    {
      id: '2',
      text: 'Hoang',
    },
    {
      id: '3',
      text: 'Hai',
    },
    {
      id: '4',
      text: 'Ngoc',
    },
  ]);

  const addUserInCard = (tag: Tag) => {
    // const userInCard: UserCard = {
    //   controller: CONTROLLER_ADD_USER_IN_CARD,
    //   userId: Number(tag.id),
    //   cardId: cardId,
    // };
    // addUserInCardService(userInCard);
    setTags([...tags, tag]);
  };

  const deleteUserInCard = (tag: Tag) => {
    // const userInCard: UserCard = {
    //   controller: CONTROLLER_DEL_USER_IN_CARD,
    //   userId: Number(tag.id),
    //   cardId: cardId,
    // };
    // deleteUserInCardService(userInCard);
  };

//   const boardId = useMySelector((state) => state.board.id);
//   useEffect(() => {
//     userInBoardService(boardId).then((res) => {
//       setUsers(res.data.users ?? []);
//       userInCardService(cardId).then((res) => setTags(res.data.users ?? []));
//     });
//   }, [tags]);

  return (
    <div className="z-[100000]">
      <ReactTags
        tags={tags}
        suggestions={users}
        delimiters={[]}
        handleDelete={(i) => {
          deleteUserInCard(tags[i]);
          setTags(tags.filter((tag, index) => index !== i));
        }}
        handleAddition={(tag) => addUserInCard(tag)}
        inputFieldPosition="inline"
        autocomplete
        placeholder="Search to add new member..."
        allowDragDrop={false}
      />
    </div>
  );
};

export default MemberTag;
