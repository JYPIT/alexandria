import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function Search() {
  const location = useLocation();
  const searchInput = location.state.searchInput;

  const [searched, setSearched] = useState();

  useEffect(() => {
    fetch('/data/searched.json')
      .then((res) => res.json())
      .then((data) => setSearched(data.item));
  }, []);

  return (
    <div>
      {searched &&
        searched.map((book) => (
          <div key={book.isbn}>
            <img src={book.cover} alt="none" />
            <span>{book.title}</span>
          </div>
        ))}
    </div>
  );
}
