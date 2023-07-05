import styled from 'styled-components';
import { ImBookmark } from 'react-icons/im';
import useLibBooks from '../hooks/useLibBooks';

const Wrapper = styled.div`
  font-size: 1rem;
  width: 1.5rem;
  height: 3rem;
  position: absolute;
  right: 0.8rem;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  cursor: pointer;
  :hover {
    transform: scaleY(1);
  }
  svg :hover {
    fill: red;
  }
`;

export default function BookMark({ book }) {
  const {
    getBooksFromLib: { data: libBooks },
    addBookToLib,
    removeBookFromLib,
  } = useLibBooks();
  const inLibBooks = libBooks && libBooks.map((book) => book.itemId);

  const clickBookMark = (book) => {
    if (inLibBooks && inLibBooks.includes(book.itemId)) {
      removeBookFromLib.mutate(book.itemId);
    }
    if (inLibBooks && !inLibBooks.includes(book.itemId)) {
      addBookToLib.mutate(book);
    }
  };
  return (
    <Wrapper onClick={() => clickBookMark(book)}>
      {inLibBooks && inLibBooks.includes(book.itemId) ? ( //
        <ImBookmark color="red" size="24" />
      ) : (
        <ImBookmark color="lightGray" size="24" />
      )}
    </Wrapper>
  );
}
