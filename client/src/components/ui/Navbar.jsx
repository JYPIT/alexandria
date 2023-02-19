import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../../context/AuthContext';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: bisque;
  padding: 0 1.5rem;
`;
const Logo = styled.svg`
  width: 5rem;
  height: 100%;
  margin-right: 2rem;
  cursor: pointer;
  :hover {
    fill: red;
  }
`;
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

const Col = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-right: 2rem;
`;

const Indicator = styled.span`
  position: absolute;
  background-color: red;
  border-bottom: 1px solid red;
  width: 4rem;
  bottom: 0;
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
const LoginBtn = styled.button`
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
`;
export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [text, setTetxt] = useState('');
  const [modalClicked, setModalClicked] = useState(false);
  const navigate = useNavigate();
  const roomsMatch = useMatch('rooms');
  const adminMatch = useMatch('admin');
  const librayMatch = useMatch('library');

  const handleLogin = () => login();
  const handleLogout = () => {
    logout(user.auth);
    setModalClicked(false);
  };

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
      <Col>
        <Link to="/">
          <Logo whileHover="active" initial="normal" xmlns="http://www.w3.org/2000/svg" width="1024" height="276.742" viewBox="0 0 1024 276.742">
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>

        {user && (
          <>
            <Item>
              <Link to="rooms">Talking Rooms </Link>
              {roomsMatch && <Indicator />}
            </Item>
            <Item>
              {user.isAdmin && <Link to="/admin">Admin </Link>}
              {adminMatch && <Indicator />}
            </Item>
          </>
        )}
      </Col>
      <Search onSubmit={handleSearch}>
        <input //
          type="text"
          placeholder="제목 검색..."
          value={text}
          onChange={handleChange}
        />
      </Search>
      <Col>
        {user && (
          <>
            <Item>
              <Link to="/library">My Library </Link>
              {librayMatch && <Indicator />}
            </Item>
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
        )}
        {!user && <LoginBtn onClick={handleLogin}>Login</LoginBtn>}
      </Col>
    </Nav>
  );
}
