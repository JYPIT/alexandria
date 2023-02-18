import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';
import useBooks from '../hooks/useBooks';
import useLibBooks from '../hooks/useLibBooks';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;
const GridItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const BookAuthor = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const CategoryTitle = styled.span`
  font-size: 2rem;
`;

const Star = styled.button`
  position: absolute;
  right: 1rem;
  background-color: gray;
  opacity: 0.7;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const {
    addBook,
    getBooks: { isLoading, data: books },
  } = useBooks();
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
    <div>
      <CategoryTitle>Bestseller</CategoryTitle>
      <Grid>
        {!isLoading &&
          books.map((book) => (
            <GridItem key={book.itemId}>
              <div>
                <Star onClick={() => clickStar(book)}> {inLibBooks && inLibBooks.includes(book.itemId) ? '⭐️' : '☆'}</Star>
              </div>
              <div onClick={() => clickBook(book.itemId, book)}>
                <BookImg src={book.cover} alt="정보 없음" />
                <BookInfo>
                  <BookTitle>{book.title}</BookTitle>
                  {book.author.split(',').map((a) => (
                    <BookAuthor key={a}>{a}</BookAuthor>
                  ))}
                </BookInfo>
              </div>
            </GridItem>
          ))}
      </Grid>
      <div>
        <CategoryTitle>New Books</CategoryTitle>
      </div>
      <div>
        <CategoryTitle>Editor Recommand</CategoryTitle>
      </div>
    </div>
  );
}

export default Home;
