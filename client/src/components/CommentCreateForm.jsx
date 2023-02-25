import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
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
    font-size: 18px;
    background-color: transparent;
    padding: 1rem;
    color: black;
    /* overflow: hidden; */
    resize: none;
    border: none;
    outline: none;
  }
`;
export default function CommentCreateForm({ user, handleCreateComment }) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleGuestClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  };
  const handleKeyDown = (e) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
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
      <InputText onClick={handleGuestClick}>
        <textarea type="text" placeholder="댓글 입력..." value={text} maxLength="130" minLength="1" onChange={handleChange} onKeyDown={handleKeyDown} />
      </InputText>
    </InputBox>
  );
}
