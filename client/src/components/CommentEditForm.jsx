import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form``;
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid gray;
`;

export default function CommentEditForm({ bookId, commentId, prevText, setEditing, setComments, handleUpdateComment }) {
  const [text, setText] = useState(prevText);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateComment(commentId, text);
    setEditing(false);
    setText('');
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  //FIXME: input을 textarea로 변경하기
  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={text} autoFocus={true} onChange={handleChange} />
    </Form>
  );
}
