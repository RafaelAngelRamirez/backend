//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";
import Publicacion, {
  IPublicaciones,
} from "../../database/models/publicaciones";

export const Publicaciones = async (req: Request, res: Response) => {
  const { user }: any = req;
  const users = [user._id];
  try {
    const usr: IUsuario | null | any = await Usuario.findById(user._id);
    for await (let element of usr?.amigos) {
      users.push(element);
    }
    const publicaciones: IPublicaciones[] = await Publicacion.find({
      usuario: { $in: users },
    })
      .sort({ createdAt: 1 })
      .populate("usuario")
      .populate("likes")
      .populate("comments");
    return res.status(200).json(publicaciones);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Intentalo mas tarde." });
  }
};
