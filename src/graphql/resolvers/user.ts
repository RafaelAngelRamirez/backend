//MODELS
import Usuario, { IUsuario } from "../../database/models/usuario";

export const ResolverUser = {
  Query: {
    user: async (root: any, args: any, { usuario }: any) => {
      return usuario
    }
  },
};
