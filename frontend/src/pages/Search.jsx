import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import BookGrid from '../components/BookGrid';

const Wrapper = styled.div`
  padding: 5rem 2rem;
`;
const SearchResult = styled.span`
  font-size: 30px;
`;

const Search = memo(({ searchService }) => {
  const [searched, setSearched] = useState();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('search_query');

  useEffect(() => {
    searchService.getSearchedList(keyword).then((data) => setSearched(data));
  }, [searchService, keyword]);

  return (
    <Wrapper>
      {searched && searched.length > 0 ? (
        <SearchResult>" {keyword} "에 대한 결과</SearchResult>
      ) : (
        <SearchResult>" {keyword} "에 대한 결과가 존재하지 않습니다.</SearchResult>
      )}
      {searched && <BookGrid books={searched} />}
    </Wrapper>
  );
});
export default memo(Search);
