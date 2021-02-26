//MODELS
import Usuario, { IUsuario } from "../../database/models/usuario";

export const ResolverFriends = {
  Query: {
    suggestions: async (root: any, args: any, { usuario }: any) => {
      const { amigos } = usuario;
      const exclude = [usuario._id];
      for (const friend of amigos) {
        exclude.push(friend._id);
      }
      try {
        const friends = await Usuario.find({ _id: { $nin: exclude } }).populate(
          {
            path: "amigos",
          }
        );
        return {
          error: false,
          message: "exito",
          success: true,
          sugerencias: friends,
        };
      } catch (error) {
        console.log(error);
        return {
          error: true,
          message: "error al buscar sugerencias",
          success: false,
        };
      }
    },
  },
  Mutation: {
    add_friend: async (root: any, {_id: id}: any, { usuario }: any) => {
      const { _id } = usuario;
      try {
        const usr: IUsuario | null | any = await Usuario.findById(_id);
        if (!usr)
          return {
            error: true,
            message: "no se encontro el usuario actual",
            success: false,
          };
        usr.solicitudes.addToSet({
          tipo: "enviada",
          usuario: id,
          createdAt: new Date(),
        });
        await usr.save();
        const user: IUsuario | null | any = await Usuario.findById(id);
        if (!user)
          return {
            error: true,
            message: "no se encontro el usuario actual",
            success: false,
          };
        user.solicitudes.addToSet({
          tipo: "recibida",
          usuario: _id,
          createdAt: new Date(),
        });
        await user.save();
        return {
          error: false,
          message: "solicitud enviada con exito",
          success: true,
        };
      } catch (error) {
        console.error(error);
        return {
          error: true,
          message: "error al agregar como amigo al usuario.",
          success: false,
        };
      }
    },
  },
};
