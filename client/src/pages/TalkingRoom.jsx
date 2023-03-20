import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';

const Container = styled.div`
  padding: 6rem 3rem 3rem 3rem;
`;
const TitleAndLeave = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 0.5rem 0.5rem;
  span {
    font-size: 24px;
  }
`;
const OutBtn = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  opacity: 0.7;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;
const ChatBox = styled.div`
  height: 70vh;
  background-color: lightgray;
  overflow-y: scroll;
  border-top-left-radius: 1rem;
`;
const OtherChatList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  height: auto;
  padding: 0 1rem;
`;
const UserChatList = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
`;
const OtherChat = styled.span`
  font-size: 18px;
  background-color: whitesmoke;
  border-radius: 1rem;
  padding: 0.5rem;
`;
const UserChat = styled.span`
  font-size: 18px;
  background-color: bisque;
  border-radius: 1rem;
  padding: 0.5rem;
`;
const ChatInputBox = styled.div`
  border: 1px solid black;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 3rem;
  background-color: lightgray;
  font-size: 16px;
  padding: 0 1rem;
  border: none;
  outline: none;
  :focus {
    background-color: whitesmoke;
  }
`;

const baseURL = process.env.REACT_APP_BASE_URL;
export default function TalkingRoom() {
  const { user } = useAuthContext();
  const [currentSocket, setCurrentSocket] = useState();
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);
  const location = useLocation();
  const roomName = location.pathname.split('/')[2];

  const navigate = useNavigate();

  useEffect(() => {
    currentSocket && currentSocket.emit('join', { roomName, user });
  }, [currentSocket, roomName, user]);

  if (currentSocket) {
    return;
  } else {
    setCurrentSocket(io(`${baseURL}/chat`));
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    currentSocket.emit('msg', { username: user.displayName, msg: text });
    setText('');
  };

  if (currentSocket) {
    currentSocket.on('msg', (data) => {
      setChats([...chats, data]);
    });

    currentSocket.on('disconnected', (data) => {
      console.log(data.msg);
      setChats([...chats, data]);
    });
  }

  const handleOutBtn = () => {
    currentSocket && currentSocket.disconnect();
    navigate('/rooms', { replace: true });
  };

  return (
    <Container>
      <TitleAndLeave>
        <span>{roomName}</span>
        <OutBtn onClick={handleOutBtn}>나가기</OutBtn>
      </TitleAndLeave>
      <ChatBox>
        <ul>
          {chats.map((chat, index) =>
            user.displayName === chat.username ? (
              <UserChatList key={index}>
                <UserChat>{chat.msg}</UserChat>
              </UserChatList>
            ) : (
              <OtherChatList key={index}>
                <OtherChat>{chat.msg}</OtherChat>
              </OtherChatList>
            )
          )}
        </ul>
      </ChatBox>
      <ChatInputBox>
        <form onSubmit={handleSubmit}>
          <ChatInput //
            type="text"
            value={text}
            placeholder="코멘트 입력..."
            autoFocus={true}
            onChange={handleChange}
          />
        </form>
      </ChatInputBox>
    </Container>
  );
}
