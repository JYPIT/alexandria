import { useLocation } from 'react-router';
import styled from 'styled-components';
import BookRecommended from '../components/BookRecommended';
import Comment from '../components/Comment';

const Container = styled.div`
  padding-top: 4rem;
`;

const BookSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Cover = styled.img`
  width: 30rem;
  height: 40rem;
`;

const Info = styled.div`
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;
`;
const Title = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;
const CommentSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1200px;
`;

export default function BookDetail() {
  const location = useLocation();
  const book = location.state.book;

  const { cover, title, author, isbn, isbn13, publisher, description } = book;

  return (
    <Container>
      <BookSection>
        <Cover src={cover} alt="이미지 없음" />
        <Info>
          <Title>{title}</Title>
          <span>저자: {author}</span>
          <span>출판사: {publisher}</span>
          <span>ISBN: {isbn}</span>
          <span>ISBN13: {isbn13}</span>
          <p>{description}</p>
        </Info>
      </BookSection>
      <CommentSection>
        <Comment />
        <BookRecommended />
      </CommentSection>
    </Container>
  );
}
