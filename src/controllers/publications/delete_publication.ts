//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";
import Publicaciones from "../../database/models/publicaciones";

export const Delete_publication = async (req: Request, res: Response) => {
  const { user, body }: any = req;
  try {
    const usr: IUsuario | null | any = await Usuario.findById(user._id);
    usr?.publicaciones.remove({ _id: body._id });
    await usr.save();
    await Publicaciones.deleteOne({ _id: body._id });
    return res.status(200).json({
      message: "Publicacion eliminada.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al eliminar una publicacion, intentlo mas tarde.",
    });
  }
};
