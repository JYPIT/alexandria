import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TalkingRoom from '../pages/TalkingRoom';
const baseURL = process.env.REACT_APP_BASE_URL;

export default function useChat() {
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(io(baseURL));
  }, []);

  return (
    <div>
      {currentSocket ? ( //
        <TalkingRoom socket={currentSocket} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}
