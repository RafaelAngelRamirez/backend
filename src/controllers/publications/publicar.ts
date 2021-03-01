//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";
import Publicacion, {
  IPublicaciones,
} from "../../database/models/publicaciones";
//SOCKET
import { getSocket } from "../../socket";

const EmitterNewPublication = async (_id: String) => {
  const socket = getSocket();
  const publicacion: IPublicaciones | any = await Publicacion.findById(
    _id
  ).populate({ path: "usuario" });
  socket.emit("NEW_PUBLICATION", publicacion);
};

export const Publicar = async (req: Request, res: Response) => {
  const { user, body }: any = req;
  try {
    const usuario: IUsuario | null | any = await Usuario.findById(user._id);
    const new_publication = new Publicacion({
      texto: body.texto,
      usuario: usuario._id,
    });
    const publi: IPublicaciones = await new_publication.save();
    usuario.publicaciones.addToSet(publi._id);
    await usuario.save();
    await EmitterNewPublication(publi._id);
    return res.status(200).json({ message: "Publicado con exito." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Ocurrio un error al publicar." });
  }
};
