import styled from 'styled-components';
import { useNavigate } from 'react-router';
import BookMark from './BookMark';
import { motion } from 'framer-motion';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  place-items: center;
  padding: 1rem;
  margin: 0 2rem 2rem 2rem;
  border-bottom: 1px solid gray;
`;
const GridItem = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 11rem;
  height: 20rem;
  overflow: hidden;
  margin-bottom: 1rem;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const BookImg = styled.img`
  width: 100%;
  height: 14rem;
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
`;

const BookInfo = styled.ul`
  width: 11rem;
`;
const BookTitle = styled.li`
  font-size: 1.2rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 4px;
`;
const BookAuthor = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;

export default function BookGrid({ books, isLoading }) {
  const navigate = useNavigate();

  const clickBook = (book) => {
    navigate(`/books/${book.itemId}`, { state: { book: book } });
  };

  return (
    <Grid>
      {!isLoading &&
        books.map((book) => (
          <GridItem key={book.itemId}>
            <BookMark book={book} />
            <div onClick={() => clickBook(book)}>
              <BookImg src={book.cover} alt="정보 없음" />
              <BookInfo>
                <BookTitle>{book.title}</BookTitle>
                {book.author.split(',').map((author) => (
                  <BookAuthor key={author}>{author}</BookAuthor>
                ))}
              </BookInfo>
            </div>
          </GridItem>
        ))}
    </Grid>
  );
}
