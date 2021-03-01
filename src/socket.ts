import { Server, Socket } from 'socket.io'
import { Server as ServerHTTP } from 'http'
import { decode } from 'jsonwebtoken'
import Usuario from './database/models/usuario'
let socket: Socket

export const connection = (server: ServerHTTP) => {
  const options = {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  }
  const io = new Server(server, options);
  io.on("connection", async (newSocket: Socket) => {
    const { token }: any = newSocket.handshake.query
    const tokenUser: any = decode(token)
    try {
      await Usuario.findByIdAndUpdate(tokenUser.id, { socket: newSocket.id})
      socket = newSocket;
    } catch (error) {
      console.log(error)
    }
    console.log("Socket conectado con el id:", newSocket.id)
  });
};

export const getSocket: () => Socket = () => socket;