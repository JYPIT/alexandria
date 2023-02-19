import useBooks from '../hooks/useBooks';
import { useAuthContext } from '../context/AuthContext';
import useLibBooks from '../hooks/useLibBooks';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { FcBookmark } from 'react-icons/fc';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  place-items: center;
  padding: 0 1rem 1rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
`;
const GridItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10rem;
  height: 20rem;
  padding: 1rem;
  overflow: hidden;
  cursor: pointer;
`;
const BookImg = styled.img`
  width: 9rem;
  height: 12rem;
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
`;

const BookInfo = styled.ul``;
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
  margin-bottom: 3px;
`;
const Star = styled.button`
  color: red;
  font-size: 1rem;
  position: absolute;
  height: 3rem;
  right: 1.3rem;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  cursor: pointer;
  :hover {
    transform: scaleY(1.2);
  }
`;
const StarIcon = styled.span`
  font-size: 1rem;
`;

export default function BookGrid({ books, isLoading }) {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { addBook } = useBooks();
  const {
    getBooksFromLib: { data: libBooks },
  } = useLibBooks();
  const inLibBooks = libBooks && libBooks.map((book) => book.id);

  const clickBook = (id, book) => {
    navigate(`/books/${id}`, { state: { book: book } });
  };

  const clickStar = (book) => {
    addBook.mutate(
      { user, book },
      {
        onSuccess: () => {
          console.log('서재에 등록 완료');
        },
      }
    );
  };
  return (
    <Grid>
      {!isLoading &&
        books.map((book) => (
          <GridItem key={book.itemId}>
            <Star onClick={() => clickStar(book)}>
              {inLibBooks && inLibBooks.includes(book.itemId) ? (
                <StarIcon>
                  <FcBookmark />
                </StarIcon>
              ) : (
                '☆'
              )}
            </Star>
            <div onClick={() => clickBook(book.itemId, book)}>
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
