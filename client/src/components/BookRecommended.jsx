import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBooks from '../hooks/useBooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border: 3px solid blue;
`;

const Subject = styled.span`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-bottom: 1rem;
`;
const Book = styled.div`
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 1.5rem;
`;
const Img = styled.img`
  width: 10rem;
  height: 15rem;
`;
export default function BookRecommended() {
  const [recommended, setRecommended] = useState();
  useEffect(() => {
    fetch('/data/searched.json')
      .then((res) => res.json())
      .then((data) => setRecommended(data.item));
  }, []);

  return (
    <Container>
      <Subject>비슷한 이름의 책 추천</Subject>
      {recommended &&
        recommended.map((book) => (
          <Book key={book.itemId}>
            <Img src={book.cover} alt="" />
          </Book>
        ))}
    </Container>
  );
}
