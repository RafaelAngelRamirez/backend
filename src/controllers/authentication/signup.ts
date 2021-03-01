//EXPRESS
import { Request, Response } from "express";
//MODELOS
import Usuario, { IUsuario } from "../../database/models/usuario";
//JSONWEBTOKEN
import { sign } from "jsonwebtoken";
//CREATE-TOKEN
function CreateToken(user: IUsuario) {
  return sign({ id: user._id }, "secret");
}

export const SignUp = async (req: Request, res: Response) => {
  const { nombre, apellido, usuario, email, password, password2 } = req.body;
  if (nombre.trim() === "" || nombre.trim().length === 0)
    return res.status(400).json({ message: "Ingrese su nombre." });
  if (apellido.trim() === "" || apellido.trim().length === 0)
    return res.status(400).json({ message: "Ingrese su apellido." });
  if (usuario.trim() === "" || usuario.trim().length === 0)
    return res.status(400).json({ message: "Ingrese un nombre de usuario." });
  if (email.trim() === "" || email.trim().length === 0)
    return res.status(400).json({ message: "Ingrese su email." });
  if (password.length <= 5)
    return res
      .status(400)
      .json({ message: "Su contraseña debe tener al menos 6 caracteres." });
  if (password.trim() === "" || password.trim().length === 0)
    return res.status(400).json({ message: "Ingrese una contraseña." });
  if (password2.trim() === "" || password2.trim().length === 0)
    return res.status(400).json({ message: "Repita su contraseña." });
  if (password !== password2)
    return res.status(400).json({ message: "Sus contraseñas no coinciden." });
  try {
    console.log("ok");
    const user: IUsuario | null = await Usuario.findOne({ usuario });
    const correo: IUsuario | null = await Usuario.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "El usuario ingresado ya existe." });
    if (correo)
      return res
        .status(400)
        .json({ message: "El correo ingresado ya existe." });
    const new_user = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      usuario: req.body.usuario,
      email: req.body.email,
      password: req.body.password,
    });
    await new_user.save();
    return res.status(200).json({
      message: "Registro exitoso.",
      token: CreateToken(new_user),
      usuario: new_user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrio un error al intentar registrar, intentalo mas tarde.",
    });
  }
};
