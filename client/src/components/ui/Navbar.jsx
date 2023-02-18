import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../../context/AuthContext';

const Nav = styled.nav`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: bisque;
  padding: 0 1rem;
`;
// const Button = styled.button`
//   background-color: ${(props) => props.theme.bgColor};
// `;
const Avatar = styled.img`
  height: 60%;
  border-radius: 100%;
`;
const ProfileOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 4;
`;
const Profile = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 4.5rem;
  right: 0.5rem;
  width: 10rem;
  height: 10rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  z-index: 5;
`;
export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [text, setTetxt] = useState('');
  const [modalClicked, setModalClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => login();
  const handleLogout = () => logout(user.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    setTetxt('');
    navigate(`/search/${text}`, { state: { searchInput: text } });
  };
  const handleChange = (e) => setTetxt(e.target.value);

  const handleModalClick = () => {
    setModalClicked((prev) => !prev);
  };
  return (
    <Nav>
      <Link to="/">Alexandria</Link>

      <span>All Books</span>
      <span>Talking Room</span>
      <form onSubmit={handleSearch}>
        <input //
          type="text"
          placeholder="제목 검색..."
          value={text}
          onChange={handleChange}
        />
        <button>검색</button>
      </form>
      {user ? (
        <>
          {user.isAdmin && <Link to="/admin">Admin</Link>}
          <Link to="/mylibrary">My Library</Link>
          <Avatar src={user.photoURL} alt="" onClick={handleModalClick} />
          {modalClicked && (
            <>
              <ProfileOverlay onClick={() => setModalClicked(false)} />
              <Profile>
                <span>{user.displayName}</span>
                <button onClick={handleLogout}>Logout</button>
              </Profile>
            </>
          )}
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      {/* <Button onClick={() => setIsDark((prev) => !prev)}>{isDark[0] ? 'light mode' : 'dark mode'}</Button> */}
    </Nav>
  );
}
