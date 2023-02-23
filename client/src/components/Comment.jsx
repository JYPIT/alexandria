import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';

import CommentBox from './CommentBox';
import CommentCreateForm from './CommentCreateForm';

const Container = styled.div`
  width: 70%;
  border: 3px solid orange;
  padding: 1rem;
`;

const AvatarBox = styled.div``;
const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 100%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
`;

const Comment = memo(({ commentService, bookId }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentService
      .getComments(bookId)
      .then((comments) => setComments([...comments]))
      .catch((error) => console.log(error));
  }, [commentService, bookId, user]);

  const handleCreateComment = (text) => {
    commentService.postComment(user, text, bookId).then((comment) => {
      setComments((comments) => [comment, ...comments]);
    });
  };
  const handleDeleteComment = (commentId) => {
    commentService.deleteComment(bookId, commentId).then(() => setComments((comments) => comments.filter((comment) => comment.id !== commentId)));
  };

  const handleUpdateComment = (commentId, text) => {
    commentService.UpdateComment(bookId, commentId, text);
  };
  return (
    <Container>
      <CommentCreateForm user={user} bookId={bookId} commentService={commentService} handleCreateComment={handleCreateComment} />
      {comments &&
        comments.map((comment) => (
          <Box key={comment.id}>
            <AvatarBox>
              <Avatar src={comment.avatar} alt="" />
            </AvatarBox>
            <CommentBox
              commentService={commentService}
              bookId={bookId}
              comment={comment}
              setComments={setComments}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          </Box>
        ))}
    </Container>
  );
});
export default Comment;
