//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";

export const add_friend = async (req: Request, res: Response) => {
  const { user, body }: any = req;
  try {
    const usuario: IUsuario | null | any = await Usuario.findById(user._id);
    if (!usuario)
      return res
        .status(400)
        .json({ message: "no se encontro el usuario actual" });
    usuario.solicitudes_enviadas.addToSet({ usuario: user._id });
    await usuario.save();
    const usr: IUsuario | null | any = await Usuario.findById(body._id);
    if (!usr)
      return res
        .status(400)
        .json({ message: "no se encontro el usuario actual" });
    usr.solicitudes_recibidas.addToSet({ usuario: body._id });
    await usr.save();
    return res.status(200).json({ message: "solicitud enviada con exito" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "error al agregar como amigo al usuario." });
  }
};

export const remove_friend = async (req: Request, res: Response) => {
  const { user, body }: any = req;
  try {
    const usuario: IUsuario | null | any = await Usuario.findById(user._id);
    if (!usuario)
      return res
        .status(400)
        .json({ message: "no se encontro el usuario actual" });
    usuario.solicitudes_enviadas.remove({ usuario: user._id });
    await usuario.save();
    const usr: IUsuario | null | any = await Usuario.findById(body._id);
    if (!usr)
      return res
        .status(400)
        .json({ message: "no se encontro el usuario actual" });
    usr.solicitudes_recibidas.remove({ usuario: body._id });
    await usr.save();
    return res.status(200).json({ message: "solicitud enviada con exito" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "error al agregar como amigo al usuario." });
  }
}
