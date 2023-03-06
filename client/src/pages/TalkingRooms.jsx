import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { io } from 'socket.io-client';
const Container = styled.div`
  padding: 6rem 3rem 3rem 3rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  span {
    font-size: 24px;
    font-weight: 400;
  }
  button {
    border-radius: 0.5rem;
    background-color: lightgray;
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }
`;
const RoomListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const Room = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    background-color: lightblue;
  }
`;
const RoomTitle = styled.span`
  font-size: 24px;
  margin-bottom: 1rem;
`;
const baseURL = process.env.REACT_APP_BASE_URL;

export default function TalkingRooms() {
  const [currentSocket, setCurrentSocket] = useState();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSocket) {
      return;
    } else {
      setCurrentSocket(io(`${baseURL}/room`));
    }
  }, []);

  useEffect(() => {
    currentSocket &&
      currentSocket.on('getRooms', (rooms) => {
        setRooms(rooms);
      });
  }, [currentSocket]);

  currentSocket &&
    currentSocket.on('createRoom', (rooms) => {
      setRooms([...rooms]);
    });

  currentSocket &&
    currentSocket.on('removeRoom', function (data) {
      console.log(data);
    });

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    currentSocket.emit('createRoom', roomName);

    setRoomName('');
  };

  const EnterRoomHandler = (room) => {
    currentSocket && currentSocket.disconnect();
    navigate(`${room}`);
  };

  const handleOutBtn = () => {
    currentSocket && currentSocket.disconnect();
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <Header>
        <span>ROOM LIST</span>
        <button onClick={handleOutBtn}>나가기</button>
      </Header>

      <form onSubmit={handleSubmit}>
        <input type="roomName" value={roomName} onChange={handleChange} />
        <button>방 생성하기</button>
      </form>
      <RoomListGrid>
        {rooms.map((room, index) => (
          <Room key={index} onClick={() => EnterRoomHandler(room)}>
            <RoomTitle>{room}</RoomTitle>
            <span>참가 인원</span>
            <span>{Date()}</span>
          </Room>
        ))}
      </RoomListGrid>
    </Container>
  );
}
