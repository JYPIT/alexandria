import styled from 'styled-components';
import LibraryBook from '../components/LibraryBook';
import { useAuthContext } from '../context/AuthContext';
import useLibBooks from '../hooks/useLibBooks';

const Container = styled.div``;
const Title = styled.span`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 1rem 0;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`;

export default function MyLibrary() {
  const { user } = useAuthContext();

  const {
    getBooksFromLib: { isLoading, data: books },
  } = useLibBooks();

  const hasProducts = books && books.length > 0;
  if (isLoading) return <p>Loading...</p>;
  return (
    <Container>
      <Title>{user.displayName}의 서재</Title>
      {!hasProducts && <p>현재 담겨있는 상품이 존재하지 않습니다.</p>}
      <Grid>{books && books.map((book) => <LibraryBook key={book.id} book={book} />)}</Grid>
    </Container>
  );
}
