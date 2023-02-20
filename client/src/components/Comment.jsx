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
  height: auto;
  margin-bottom: 1rem;
`;

const InputText = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  textarea {
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    background-color: transparent;
    padding: 1rem;
    color: black;
    /* overflow: hidden; */
    resize: none;
    border: none;
    outline: none;
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
const CommentList = styled.p`
  height: auto;
  white-space: pre-line;
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
  const handleKeyDown = (e) => {
    if (e.shiftKey === true && e.key === 'Enter') return console.log('YES');
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) handleSubmit(e);
  };

  return (
    <Container>
      <InputBox>
        <Avatar src={user && user.photoURL} alt="" />
        <InputText>
          <textarea type="text" placeholder="댓글 입력..." value={text} minLength="1" onChange={handleChange} onKeyDown={handleKeyDown} />
        </InputText>
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
              <CommentList>{comment.text}</CommentList>
            </InfoBox>
          </CommentBox>
        ))}
    </Container>
  );
}
