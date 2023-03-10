import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent, useAnimation } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import SearchForm from './SearchForm';
import Logo from './Logo';

const Nav = styled(motion.nav)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 10;
  overflow: hidden;
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

const Indicator = styled(motion.span)`
  position: absolute;
  border-bottom: 1px solid red;
  width: 4rem;
  bottom: 0;
`;

const Avatar = styled.img`
  height: 2.5rem;
  border-radius: 100%;
  background-color: bisque;
  cursor: pointer;
`;
const ProfileOverlay = styled.div`
  position: fixed;
  display: flex;
  width: 100vh;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 4;
`;
const ProfileModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 4rem;
  right: 0.5rem;
  width: 10rem;
  height: 10rem;
  background-color: gray;
  border-radius: 1rem;
  padding: 1rem;
  z-index: 5;
  span {
    color: white;
    font-weight: 400;
  }
  button {
    background-color: lightgray;
    border-radius: 1rem;
    height: 2rem;
    cursor: pointer;
  }
`;
const LoginBtn = styled.button`
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
`;

const navVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: '#ece6cc',
  },
};

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  const [modalClicked, setModalClicked] = useState(false);

  const roomsMatch = useMatch('rooms');
  const adminMatch = useMatch('admin');
  const librayMatch = useMatch('library');
  const hideAnimation = useAnimation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest < 60) {
      hideAnimation.start('top');
    } else {
      hideAnimation.start('scroll');
    }
  });

  const handleLogin = () => login();
  const handleLogout = () => {
    logout(user.auth);
    setModalClicked(false);
  };

  const handleModalClick = () => {
    setModalClicked((prev) => !prev);
  };
  return (
    <Nav variants={navVariants} animate={hideAnimation} initial={'top'}>
      <Col>
        <Link to="/">
          <Logo />
        </Link>
        {user && (
          <>
            <Item>
              <Link to="rooms">Talking Rooms </Link>
              {roomsMatch && <Indicator layoutId="indicator" />}
            </Item>
            <Item>
              {user.isAdmin && <Link to="/admin">Admin </Link>}
              {adminMatch && <Indicator layoutId="indicator" />}
            </Item>
          </>
        )}
      </Col>
      <SearchForm />
      <Col>
        {user && (
          <>
            <Item>
              <Link to="/library">My Library </Link>
              {librayMatch && <Indicator />}
            </Item>
            <Avatar //
              src={user.photoURL}
              alt=""
              referrerPolicy="no-referrer"
              onClick={handleModalClick}
            />
            {modalClicked && (
              <>
                <ProfileOverlay onClick={() => setModalClicked(false)} />
                <ProfileModal>
                  <span>{user.displayName}</span>
                  <button onClick={handleLogout}>Logout</button>
                </ProfileModal>
              </>
            )}
          </>
        )}
        {!user && <LoginBtn onClick={handleLogin}>Login</LoginBtn>}
      </Col>
    </Nav>
  );
}
