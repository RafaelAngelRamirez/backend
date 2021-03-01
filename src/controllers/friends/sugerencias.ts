//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";

export const Sugerencias = async (req: Request, res: Response) => {
  const { user }: IUsuario | any = req;
  const exclude = [user._id];
  for (const friend of user.amigos) {
    exclude.push(friend._id);
  }
  try {
    const friends = await Usuario.find({ _id: { $nin: exclude } }).populate({
      path: "amigos",
    });
    return res.status(200).json({ sugerencias: friends });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al buscar sugerencias" });
  }
};
