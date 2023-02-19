import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
`;

const Subject = styled.span`
  text-align: center;
  font-size: 1.3rem;
  padding: 10px;
  margin: 1rem 0 2rem 0;
  color: white;
  background-color: gray;
  border-radius: 1rem;
`;
const Book = styled.div`
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 2rem;
  cursor: pointer;
`;
const Img = styled.img`
  width: 10rem;
  height: 15rem;
`;
export default function BookRecommended() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState();
  useEffect(() => {
    fetch('/data/searched.json')
      .then((res) => res.json())
      .then((data) => setRecommended(data.item));
  }, []);

  const handleClickBook = (book) => {
    navigate(`/books/${book.id}`, { state: { book: book } });
  };

  return (
    <Container>
      <Subject>비슷한 이름의 책 추천</Subject>
      {recommended &&
        recommended.map((book) => (
          <Book key={book.itemId} onClick={() => handleClickBook(book)}>
            <Img src={book.cover} alt="" />
          </Book>
        ))}
    </Container>
  );
}
