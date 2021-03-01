//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Publicaciones, {
  IPublicaciones,
} from "../../database/models/publicaciones";
import { IUsuario } from "../../database/models/usuario";
//SOCKET
import { getSocket } from "../../socket";

const EmitterNewLike = async (_id: String, usr: IUsuario) => {
  const socket = getSocket();
  const publicacion: IPublicaciones | any = await Publicaciones.findById(
    _id
  ).populate({ path: "usuario" });
  socket.emit("NEW_LIKE", publicacion, usr);
};

export const Likear = async (req: Request, res: Response) => {
  const { user, body }: any = req;
  try {
    const publicacion:
      | IPublicaciones
      | null
      | any = await Publicaciones.findById(body._id);
    publicacion.likes.addToSet(user._id);
    await publicacion.save();
    await EmitterNewLike(body._id, user)
    return res.status(200).json({ message: "Likeado con exito." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al likear publicacion." });
  }
};
