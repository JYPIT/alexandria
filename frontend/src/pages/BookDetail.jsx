import { useLocation } from 'react-router';
import styled from 'styled-components';
import BookRecommended from '../components/BookRecommended';
import Comment from '../components/comment/Comment';

const Container = styled.div`
  padding-top: 4rem;
`;

const BookSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem;
  background-color: lightgray;
`;
const Cover = styled.img`
  width: 25rem;
  height: 35rem;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;

  gap: 1rem;
`;
const Title = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;
const Des = styled.p`
  border-top: 1px solid gray;
  padding: 1rem 0;
  font-size: 18px;
  line-height: 30px;
`;
const CommentSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1200px;
`;

export default function BookDetail({ commentService, recommendService }) {
  const location = useLocation();
  const book = location.state.book;
  const { itemId, cover, title, author, isbn, isbn13, publisher, description } = book;

  return (
    <Container>
      <BookSection>
        <Cover src={cover} alt="이미지 없음" />
        <Info>
          <Title>{title}</Title>
          <span>저자: {author.split(',')[0]}</span>
          {author.split(',')[1] ? <span>역자: {author.split(',')[1]}</span> : null}
          <span>출판사: {publisher}</span>
          <span>ISBN: {isbn}</span>
          <span>ISBN13: {isbn13}</span>
          <Des>{description}</Des>
        </Info>
      </BookSection>
      <CommentSection>
        <Comment commentService={commentService} bookId={itemId} />
        <BookRecommended recommendService={recommendService} book={book} />
      </CommentSection>
    </Container>
  );
}
