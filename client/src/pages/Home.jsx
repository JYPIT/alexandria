import React, { useState } from 'react';

import styled from 'styled-components';
import BookGrid from '../components/BookGrid';
import Banner from '../components/ui/Banner';
import useBooks from '../hooks/useBooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoryTitle = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;

function Home() {
  const {
    bestsellerQuery: { isLoading: bestLoading, data: bestseller },
    newBookQuery: { isLoading: newLoading, data: newBooks },
    blogbestQuery: { isLoading: blogLoading, data: blogBest },
  } = useBooks();
  return (
    <Container>
      <Banner />
      <CategoryTitle>Bestseller</CategoryTitle>
      <BookGrid books={bestseller} isLoading={bestLoading} />

      <CategoryTitle>New Books</CategoryTitle>
      <BookGrid books={newBooks} isLoading={newLoading} />

      <CategoryTitle>Editor Recommand</CategoryTitle>
      <BookGrid books={blogBest} isLoading={blogLoading} />
    </Container>
  );
}

export default Home;
