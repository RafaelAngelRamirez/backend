//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";

export const Profile = async (
  req: Request,
  res: Response
) => {
  const { _id }: any = req.body
  try {
    const usuario: IUsuario | null = await Usuario.findById(_id)
    .populate({path: 'amigos'})
    .populate({path: 'solicitudes_enviadas'})
    .populate({path: 'solicitudes_recibidas'})
    return res.status(200).json(usuario)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Error al buscar el usuario, intentelo mas tarde.'})
  }
  
};
