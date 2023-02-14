import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: bisque;
  padding: 0 1rem;
`;

export default function Navbar() {
  const [text, setTetxt] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setTetxt('');
    navigate(`/search/${text}`, { state: { searchInput: text } });
  };
  const handleChange = (e) => setTetxt(e.target.value);

  return (
    <Nav>
      <Link to="/">Alexandria</Link>
      <Link to="/login">login</Link>
      <form onSubmit={handleSearch}>
        <input //
          type="text"
          placeholder="제목 검색..."
          value={text}
          onChange={handleChange}
        />
        <button>검색</button>
      </form>
      <Link to="/mylibrary">My Library</Link>
      <span>All Books</span>
      <span>Talking Room</span>
    </Nav>
  );
}
