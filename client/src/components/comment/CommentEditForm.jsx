import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const EditInput = styled.textarea`
  width: 100%;
  height: auto;
  background-color: transparent;
  overflow: hidden;
  resize: none;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`;

export default function CommentEditForm({ commentId, prevText, setEditing, setClickedModal, handleUpdateComment }) {
  const [text, setText] = useState(prevText);
  const textRef = useRef();
  const initRows = prevText.split('\n').length;

  useEffect(() => {
    setClickedModal(false);
  }, [setClickedModal]);

  const handleKeyDown = (e) => {
    if (e.shiftKey === true && e.key === 'Enter') return;
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) handleSubmit(e);
  };

  const handleChange = (e) => {
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateComment(commentId, text);
    setEditing(false);
    setText('');
  };

  //FIXME: textarea 커서 마지막에 위치시키기
  return (
    <Wrapper>
      <EditInput //
        ref={textRef}
        rows={initRows}
        type="text"
        value={text}
        maxLength="130"
        minLength="1"
        // autoFocus={true}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Wrapper>
  );
}
