import { join } from "path";
//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";
import Publicacion, {
  IPublicaciones,
} from "../../database/models/publicaciones";

export const Publicar = async (req: Request, res: Response) => {
  const { user, body }: any = req
  const img: { url: string }[] = [];
  const t: any = req.files
  for await (const file of t) {
    const path = join(file.path);
    img.push({ url: path });
  }
  console.log(img)
  try {
    const usuario: IUsuario | null | any = await Usuario.findById(user._id);
    const new_publication = new Publicacion({
      texto: body.texto,
      usuario: usuario._id,
      file: img
    });
    const publi: IPublicaciones = await new_publication.save();
    usuario.publicaciones.addToSet(publi._id);
    await usuario.save();
    return res.status(200).json({ message: "Publicado con exito." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Ocurrio un error al publicar." });
  }
};
