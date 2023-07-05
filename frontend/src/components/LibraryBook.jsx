import { useNavigate } from 'react-router';
import styled from 'styled-components';
import BookMark from './BookMark';

const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 13rem;
  height: 20rem;
  margin-bottom: 3rem;
  :hover {
    transform: scale(1.1);
  }
`;
const Cover = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
  cursor: pointer;
`;

export default function LibraryBook({ book }) {
  const navigate = useNavigate();

  const handleClickBook = () => {
    navigate(`/books/${book.itemId}`, { state: { book: book } });
  };

  return (
    <Item>
      <BookMark book={book} />
      <Cover src={book.cover} alt="" onClick={handleClickBook} />
    </Item>
  );
}
