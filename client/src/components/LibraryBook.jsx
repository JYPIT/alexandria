import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useLibBooks from '../hooks/useLibBooks';

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 1rem;
`;
const Cover = styled.img`
  width: 13rem;
  height: 19rem;
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
`;
const Delete = styled.button`
  position: absolute;
  opacity: 0.6;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

export default function LibraryBook({ book }) {
  const navigate = useNavigate();
  const { removeBookFromLib } = useLibBooks();
  const handleRemove = () => {
    removeBookFromLib.mutate(book);
  };

  const handleClickBook = () => {
    navigate(`/books/${book.id}`, { state: { book: book } });
  };

  return (
    <Item>
      <Delete onClick={handleRemove}>❌</Delete>
      <Cover src={book.cover} alt="" onClick={handleClickBook} />
    </Item>
  );
}
