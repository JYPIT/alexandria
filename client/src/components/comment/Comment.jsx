import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/AuthContext';
import CommentBox from './CommentBox';
import CommentCreateForm from './CommentCreateForm';

const Container = styled.div`
  position: relative;
  width: 70%;
  height: auto;
  border-top: 1px solid gray;
  padding: 1rem;
`;

const Box = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
`;

const AvatarBox = styled.div``;
const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 100%;
`;

const Comment = ({ commentService, bookId }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentService
      .getComments(bookId)
      .then((comments) => setComments(comments))
      .catch((error) => console.log(error));
  }, [commentService, bookId, user]);

  const handleCreateComment = (text) => {
    commentService.postComment(bookId, user, text).then((comment) => {
      setComments((comments) => [...comment, ...comments]);
    });
  };

  const handleUpdateComment = (commentId, text) => {
    commentService.updateComment(bookId, commentId, text).then((updated) => {
      setComments((comments) => comments.map((comment) => (comment.id === updated[0].id ? updated[0] : comment)));
    });
  };

  const handleDeleteComment = (commentId) => {
    commentService
      .deleteComment(bookId, commentId)
      .then((res) => setComments((comments) => comments.filter((comment) => comment.id !== commentId)))
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <CommentCreateForm user={user} bookId={bookId} commentService={commentService} handleCreateComment={handleCreateComment} />
      {comments &&
        comments.map((comment) => (
          <Box key={comment.id}>
            <AvatarBox>
              <Avatar src={comment.avatar} alt="" referrerPolicy="no-referrer" />
            </AvatarBox>
            <CommentBox user={user} comment={comment} handleDeleteComment={handleDeleteComment} handleUpdateComment={handleUpdateComment} />
          </Box>
        ))}
    </Container>
  );
};
export default Comment;
