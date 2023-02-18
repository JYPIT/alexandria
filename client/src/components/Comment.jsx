import { useContext, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';
import { timeFormat } from '../utils/time';

const Container = styled.div`
  width: 70%;
  border: 3px solid orange;
  padding: 1rem;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
`;

const TextForm = styled.form`
  width: 100%;
  border-bottom: 1px solid gray;
  input {
    height: 3rem;
    font-size: 1rem;
    background-color: transparent;
    color: black;
  }
`;
const CommentBox = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
`;
const AvatarBox = styled.div``;
const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 100%;
`;
const InfoBox = styled.div`
  width: 100%;
`;
const UserBox = styled.div`
  height: 2rem;
`;
const TextBox = styled.div`
  height: auto;
`;

export default function Comment() {
  const { user } = useAuthContext();
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: Date.now(), username: user.displayName, avatar: user.photoURL, text: text, createdAt: Date.now() }]);
    setText('');
  };

  return (
    <Container>
      <InputBox>
        <Avatar src={user && user.photoURL} alt="" />
        <TextForm onSubmit={handleSubmit}>
          <input placeholder="댓글 입력..." value={text} onChange={handleChange} />
        </TextForm>
      </InputBox>
      {comments &&
        comments.map((comment) => (
          <CommentBox key={comment.id}>
            <AvatarBox>
              <Avatar src={comment.avatar} alt="" />
            </AvatarBox>
            <InfoBox>
              <UserBox>
                <span>{comment.username}</span> <span>{timeFormat(comment.createdAt)}</span>
              </UserBox>
              <TextBox>{comment.text}</TextBox>
            </InfoBox>
          </CommentBox>
        ))}
    </Container>
  );
}
