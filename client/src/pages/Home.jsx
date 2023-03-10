import React from 'react';

import styled from 'styled-components';
import BookGrid from '../components/BookGrid';
import Banner from '../components/Banner';
import useBooks from '../hooks/useBooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;

const CategoryTitle = styled.span`
  margin-left: 2rem;
  font-size: 2rem;
  font-weight: 400;
`;

function Home({ adminService }) {
  const {
    bestsellerQuery: { isLoading: bestLoading, data: bestseller },
    newBookQuery: { isLoading: newLoading, data: newBooks },
    blogbestQuery: { isLoading: blogLoading, data: blogBest },
  } = useBooks();

  return (
    <Container>
      <Banner adminService={adminService} />
      <CategoryTitle>베스트셀러</CategoryTitle>
      <BookGrid books={bestseller} isLoading={bestLoading} />

      <CategoryTitle>신간 도서</CategoryTitle>
      <BookGrid books={newBooks} isLoading={newLoading} />

      <CategoryTitle>블로그 베스트</CategoryTitle>
      <BookGrid books={blogBest} isLoading={blogLoading} />
    </Container>
  );
}

export default Home;
