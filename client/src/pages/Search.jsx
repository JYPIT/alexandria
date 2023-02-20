import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import BookGrid from '../components/BookGrid';

const Wrapper = styled.div`
  padding: 5rem 2rem;
`;
const SearchResult = styled.span`
  font-size: 30px;
  padding-top: 10rem;
`;

export default function Search() {
  const [searched, setSearched] = useState();
  const location = useLocation();
  const searchInput = location.state.searchInput;

  useEffect(() => {
    fetch('/data/searched.json')
      .then((res) => res.json())
      .then((data) => setSearched(data.item));
  }, []);

  return (
    <Wrapper>
      <SearchResult>" {searchInput} "에 대한 결과</SearchResult>
      {searched && <BookGrid books={searched} />}
    </Wrapper>
  );
}
