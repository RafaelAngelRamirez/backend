import { Server, Socket as ISocket } from "socket.io";
import { Server as ServerHTTP } from "http";
import { decode } from "jsonwebtoken";
//MODELS
import Usuario, { IUsuario } from "./database/models/usuario";
import Publicacion, { IPublicaciones } from "./database/models/publicaciones";

var Socket: ISocket;

export const connection = (server: ServerHTTP) => {
  const options = {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  };

  const io = new Server(server, options);

  io.use(async (sock: any, next) => {
    const { token }: any = sock.handshake.auth;
    const { id }: any = decode(token);
    try {
      const user: IUsuario | null = await Usuario.findById(id);
      sock.user = user;
      next();
    } catch (e) {
      next(new Error("unknown user"));
    }
  });

  io.on("connection", async (socket: ISocket | any) => {
    socket.leave(socket.user._id); // saliendo de la habitación predeterminada
    socket.join(socket.user._id); // unirse a la habitación personalizada

    Socket = socket;

    //LISTENERS PUBLICATIONS
    socket.on("NEW_LIKE_REQUEST", async (value: any) => {
      try {
        const publicacion: IPublicaciones | any = await Publicacion.findById(
          value.data
        );
        publicacion.likes.addToSet(socket.user._id);
        const res = await publicacion.save();
        socket.emit("NEW_LIKE_RESPONSE", {
          publicacion: res,
          usuario: socket.user,
          error: false,
        });
      } catch (error) {
        console.error(error);
        socket.emit("NEW_LIKE_RESPONSE", { error: true });
      }
    });

    socket.on("NEW_DISLIKE_REQUEST", async (value: any) => {
      try {
        const publicacion: IPublicaciones | any = await Publicacion.findById(
          value.data
        );
        publicacion.likes.remove(socket.user._id);
        const res = await publicacion.save();
        socket.emit("NEW_DISLIKE_RESPONSE", {
          publicacion: res,
          usuario: socket.user,
          error: false,
        });
      } catch (error) {
        console.error(error);
        socket.emit("NEW_DISLIKE_RESPONSE", { error: true });
      }
    });
  });
};

export const getSocket: () => ISocket = () => Socket;
