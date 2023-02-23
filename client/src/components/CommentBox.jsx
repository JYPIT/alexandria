import { memo, useState } from 'react';
import styled from 'styled-components';
import { timeFormat } from '../utils/time';
import CommentEditForm from './CommentEditForm';

const Container = styled.div`
  width: 100%;
`;
const CommentInfoBox = styled.div`
  height: 2rem;
`;
const CommentList = styled.p`
  height: auto;
  white-space: pre-line;
`;

const CommentBox = memo(({ bookId, comment, setComments, handleDeleteComment, handleUpdateComment }) => {
  const [editing, setEditing] = useState(false);
  const { id: commentId, username, text, createdAt } = comment;

  return (
    <Container>
      <CommentInfoBox>
        <span>{username}</span>
        <span>{timeFormat(createdAt)}</span>
        <button onClick={() => setEditing(true)}>수정</button>
        <button onClick={() => handleDeleteComment(commentId)}>삭제</button>
      </CommentInfoBox>
      {editing ? ( //
        <CommentEditForm
          bookId={bookId}
          commentId={commentId}
          prevText={text}
          setEditing={setEditing}
          setComments={setComments}
          handleUpdateComment={handleUpdateComment}
        />
      ) : (
        <CommentList>{comment.text}</CommentList>
      )}
    </Container>
  );
});

export default CommentBox;
