import { useState } from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 100%;
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
export default function CommentCreateForm({ user, bookId, commentService, handleCreateComment }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.shiftKey === true && e.key === 'Enter') return;
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) handleSubmit(e);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateComment(text);
    setText('');
  };
  return (
    <InputBox>
      <Avatar src={user && user.photoURL} alt="" />
      <InputText>
        <textarea type="text" placeholder="댓글 입력..." value={text} minLength="1" onChange={handleChange} onKeyDown={handleKeyDown} />
      </InputText>
    </InputBox>
  );
}
