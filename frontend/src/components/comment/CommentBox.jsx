import { memo, useState } from 'react';
import styled from 'styled-components';
import { timeFormat } from '../../utils/time';
import CommentEditForm from './CommentEditForm';

import CommentModalBtn from './CommentModalBtn';

const Container = styled.div`
  width: 100%;
  padding-right: 0.5rem;
`;
const CommentInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Username = styled.span`
  margin-right: 0.5rem;
  font-weight: 400;
`;
const Info = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const CreatedAt = styled.span`
  font-size: 13px;
`;

const BtnModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 9;
`;

const CommentList = styled.p`
  width: 700px;
  height: auto;
  white-space: pre-line;
`;

const CommentBox = memo(({ user, comment, handleDeleteComment, handleUpdateComment }) => {
  const { id: commentId, username, text, createdAt } = comment;

  const [clickedModal, setClickedModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const isUserComment = user && user.uid === comment.userId;
  const handleBtnModalClick = () => {
    setClickedModal(false);
  };

  return (
    <Container>
      {clickedModal ? <BtnModalOverlay onClick={handleBtnModalClick} /> : null}
      <CommentInfoBox>
        <Info>
          <Username>{username}</Username>
          <CreatedAt>{timeFormat(Number(new Date(createdAt)))}</CreatedAt>
        </Info>
        {isUserComment && (
          <CommentModalBtn
            commentId={commentId}
            clickedModal={clickedModal}
            setClickedModal={setClickedModal}
            editing={editing}
            setEditing={setEditing}
            handleDeleteComment={handleDeleteComment}
          />
        )}
      </CommentInfoBox>
      {editing ? ( //
        <CommentEditForm
          commentId={commentId}
          prevText={text}
          setEditing={setEditing}
          setClickedModal={setClickedModal}
          handleUpdateComment={handleUpdateComment}
        />
      ) : (
        <CommentList>{comment.text}</CommentList>
      )}
    </Container>
  );
});

export default CommentBox;
