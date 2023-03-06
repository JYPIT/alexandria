import { Server } from 'socket.io';
let rooms = [];
class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.room = this.io.of('/room');
    this.chat = this.io.of('/chat');

    // room
    this.room.on('connection', (socket) => {
      //   console.log('Room 생성', socket.id);
      this.room.emit('getRooms', rooms);
      socket.on('createRoom', (roomName) => {
        rooms.push(roomName);
        console.log('created ', roomName);
        this.room.emit('createRoom', rooms);
      });

      socket.on('disconnect', () => {
        // console.log('room 종료', socket.id);
      });
    });

    //chat
    this.chat.on('connection', (socket) => {
      let roomId;
      let username;
      //   console.log('클라이언트 생성', socket.id);
      socket.on('join', ({ roomName, user }) => {
        roomId = roomName;
        username = user.displayName;
        // console.log('클라이언트 입장: ', username);
        socket.join(roomId);
        socket.to(roomId).emit('msg', { msg: `${username}님이 ${roomId}에 입장` });
      });

      socket.on('disconnect', () => {
        socket.to(roomId).emit('disconnected', {
          msg: `${username}님의 연결이 끊어졌습니다.
        `,
        });
        // console.log(`${username}님이 ${roomId}에서 퇴장`);
        socket.leave(roomId);
      });
      socket.on('error', (error) => {
        console.error(error);
      });

      socket.on('msg', (data) => {
        this.chat.in(roomId).emit('msg', { username: data.username, msg: `${data.username}: ${data.msg}` });
      });
      console.log(this.chat.in(roomId).adapter.rooms);
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
  return socket.io;
}
