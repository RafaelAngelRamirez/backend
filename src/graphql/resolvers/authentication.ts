//MODELS
import Usuario, { IUsuario } from "../../database/models/usuario";
//JSONWEBTOKEN
import { sign } from 'jsonwebtoken'
//CREATE-TOKEN
function CreateToken(user: IUsuario) {
  return sign({ id: user._id }, "secret");
}

export const ResolverAuthentication = {
  Query: {
    __dummy: ()=> "works"
  },
  Mutation: {
    signin: async (root: any, { data }: any, info: any) => {
      const { usuario, password } = data;
      if (usuario.trim() === "" || usuario.trim().length === 0)
        return {
          error: true,
          message: "Ingrese su nombre de usuario.",
          success: false,
        };
      if (password.trim() === "" || password.trim().length === 0)
        return {
          error: true,
          message: "Ingrese su contraseña.",
          success: false,
        };
      try {
        const user: IUsuario | null = await Usuario.findOne({ usuario });
        if (!user)
          return {
            error: true,
            success: false,
            message: "El usuario no existe.",
          };
        const pass: string = String(password);
        const isMatch = await user.passwordValidate(pass);
        if (!isMatch)
          return {
            error: true,
            success: false,
            message: "Contraseña incorrecta.",
          };
        return {
          error: false,
          success: true,
          token: CreateToken(user),
          message: "Inicio de sesion exitoso.",
          usuario: user,
        };
      } catch (error) {
        console.error(error);
        return {
          error: true,
          success: false,
          message:
            "Ocurrio un error al intentar iniciar sesion, intentalo mas tarde.",
        };
      }
    },
    signup: async (root: any, { data }: any, info: any) => {
      const { nombre, apellido, usuario, email, password, password2 } = data;
      if (nombre.trim() === "" || nombre.trim().length === 0)
        return { error: true, message: "Ingrese su nombre.", success: false };
      if (apellido.trim() === "" || apellido.trim().length === 0)
        return { error: true, message: "Ingrese su apellido.", success: false };
      if (usuario.trim() === "" || usuario.trim().length === 0)
        return {
          error: true,
          message: "Ingrese un nombre de usuario.",
          success: false,
        };
      if (email.trim() === "" || email.trim().length === 0)
        return { error: true, message: "Ingrese su email.", success: false };
      if (password.length <= 5)
        return {
          error: true,
          message: "Su contraseña debe tener al menos 6 caracteres.",
          success: false,
        };
      if (password.trim() === "" || password.trim().length === 0)
        return {
          error: true,
          message: "Ingrese una contraseña.",
          success: false,
        };
      if (password2.trim() === "" || password2.trim().length === 0)
        return {
          error: true,
          message: "Repita su contraseña.",
          success: false,
        };
      if (password !== password2)
        return {
          error: true,
          message: "Las contraseñas no coinciden.",
          success: false,
        };
      try {
        const user: IUsuario | null = await Usuario.findOne({ usuario });
        const correo: IUsuario | null = await Usuario.findOne({ email });
        if (user)
          return {
            error: true,
            success: false,
            message: "El usuario ingresado ya existe.",
          };
        if (correo)
          return {
            error: true,
            success: false,
            message: "El correo ingresado ya existe.",
          };
        const new_user = new Usuario(data);
        await new_user.save();
        return {
          error: false,
          success: true,
          message: "Registro exitoso.",
          token: CreateToken(new_user),
          usuario: new_user,
        };
      } catch (error) {
        console.error(error);
        return {
          error: true,
          success: false,
          message:
            "Ocurrio un error al intentar registrar, intentalo mas tarde.",
        };
      }
    },
  },
};
