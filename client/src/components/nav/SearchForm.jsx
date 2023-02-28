import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Search = styled.form`
  position: absolute;
  width: 30%;
  left: 35%;
  margin: 0 auto;
  input {
    width: 100%;
    height: 2rem;
    background-color: transparent;
    border-bottom: 1px solid gray;
  }
`;

export default function SearchForm() {
  const navigate = useNavigate();
  const [text, setTetxt] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setTetxt('');
    navigate(`/search?search_query=${text}`);
  };
  const handleChange = (e) => setTetxt(e.target.value);
  return (
    <Search onSubmit={handleSearch}>
      <input //
        type="text"
        placeholder="제목 검색..."
        value={text}
        maxLength={40}
        onChange={handleChange}
      />
    </Search>
  );
}
