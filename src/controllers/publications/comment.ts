//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Publicaciones, {
  IPublicaciones,
} from "../../database/models/publicaciones";
import Usuario, { IUsuario } from "../../database/models/usuario";
import Comentario, { IComentarios } from "../../database/models/comentarios";

export const Comentar = async (req: Request, res: Response) => {
  const { _id }: any = req.user
  const { texto, publicacion } = req.body
  try {
    const comentario: IComentarios = new Comentario({
      texto,
      usuario: _id
    })
    await comentario.save()
    const publication: IPublicaciones | null | any = await Publicaciones.findById(publicacion._id)
    publication?.comments.addToSet(comentario._id)
    await publication.save()
    return res.status(200).json({message: 'Comentario enviado.'})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Intentalo mas tarde'})
  }
};
