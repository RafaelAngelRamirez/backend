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

export const SignIn = async (
  req: Request,
  res: Response
) => {
  const { usuario, password } = req.body;
  if (usuario.trim() === "" || usuario.trim().length === 0)
    return res.status(400).json({ message: "Ingrese su nombre de usuario." });
  if (password.trim() === "" || password.trim().length === 0)
    return res.status(400).json({ message: "Ingrese su contraseña." });
  try {
    const user: IUsuario | null = await Usuario.findOne({ usuario });
    if (!user)
      return res
        .status(400)
        .json({ message: "El usuario no existe." });
    const pass: string = String(password);
    const isMatch = await user.passwordValidate(pass);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta." });
    return res
      .status(200)
      .json({
        message: "Inicio de sesion exitoso.",
        token: CreateToken(user),
        usuario: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message:
          "Ocurrio un error al intentar iniciar sesion, intentalo mas tarde.",
      });
  }
};
