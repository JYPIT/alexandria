import { Link } from 'react-router-dom';
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
  return (
    <Nav>
      <Link to="/">Alexandria</Link>
      <Link to="/login">login</Link>
      <input type="text" placeholder="책 이름 검색..." />
      <span>All Books</span>
      <span>Talking Room</span>
    </Nav>
  );
}
