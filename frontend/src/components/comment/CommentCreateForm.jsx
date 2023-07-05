import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  width: 100%;
  /* height: auto; */
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
  textarea {
    width: 100%;
    height: 3rem;
    font-size: 18px;
    background-color: transparent;
    padding: 1rem;
    color: black;
    overflow: hidden;
    resize: none;
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
  }
`;
export default function CommentCreateForm({ user, handleCreateComment }) {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const textRef = useRef();

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
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateComment(text);
    setText('');
    textRef.current.style.height = 'auto';
  };

  return (
    <InputBox>
      <Avatar //
        src={user && user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
      />
      <InputText onClick={handleGuestClick}>
        <textarea
          ref={textRef}
          rows="1"
          type="text"
          value={text}
          placeholder="댓글 입력..."
          maxLength="130"
          minLength="1"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </InputText>
    </InputBox>
  );
}
