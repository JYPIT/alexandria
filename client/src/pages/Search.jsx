import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

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
    <div>
      <span>" {searchInput} "에 대한 결과</span>
      {searched &&
        searched.map((book) => (
          <div key={book.itemId}>
            <img src={book.cover} alt="none" />
            <span>{book.title}</span>
          </div>
        ))}
    </div>
  );
}
