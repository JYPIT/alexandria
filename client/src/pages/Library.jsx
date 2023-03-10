import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LibraryBook from '../components/LibraryBook';
import { useAuthContext } from '../context/AuthContext';
import useLibBooks from '../hooks/useLibBooks';

const Container = styled.div`
  padding-top: 4rem;
  text-align: center;
`;
const Title = styled.span`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 3rem 0;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 5px;
  padding: 0 2rem;
`;

export default function Library() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/', { replace: true });
    }
  }, [user]);

  const {
    getBooksFromLib: { isLoading, data: books },
  } = useLibBooks();

  const hasProducts = books && books.length > 0;
  return (
    <Container>
      {!isLoading ? <Title>{user.displayName}의 서재</Title> : <Title>잠시 기다려주세요...</Title>}
      {!hasProducts && <p>현재 담겨있는 상품이 존재하지 않습니다.</p>}
      <Grid>{books && books.map((book) => <LibraryBook key={book.itemId} book={book} />)}</Grid>
    </Container>
  );
}
