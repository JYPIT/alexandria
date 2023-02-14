import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  height: 20rem;
  padding: 1rem;
`;
const BookImg = styled.img`
  width: 90%;
  height: 70%;
`;
const CategoryTitle = styled.span`
  font-size: 2rem;
`;

export default function Home() {
  const navigate = useNavigate();

  const [bestsellers, setbestsellers] = useState([]);
  useEffect(() => {
    fetch('data/blogBest.json')
      .then((res) => res.json())
      .then((data) => setbestsellers(data.item));
  }, []);

  return (
    <div>
      <CategoryTitle>Bestseller</CategoryTitle>
      <Grid>
        {bestsellers.map((bestseller) => (
          <GridItem key={bestseller.isbn13} onClick={() => navigate(`/books/${bestseller.isbn13}`, { state: { book: bestseller } })}>
            <BookImg src={bestseller.cover} alt="정보 없음" />
            <span>{bestseller.title}</span>
            <span>{bestseller.author}</span>
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
