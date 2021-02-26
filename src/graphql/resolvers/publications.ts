//MODELS
import Usuario, { IUsuario } from "../../database/models/usuario";
import Publicacion, {
  IPublicaciones,
} from "../../database/models/publicaciones";
//
import { PubSub } from 'apollo-server-express'
const  pubsub = new PubSub()
const NEW_PUBLICATION = "NEW_PUBLICATION"

export const ResolverPublications = {
  Query: {
    get_post: async (root: any, args: any, { usuario }: any) => {
      const users = [ usuario._id ]
      try {
        const usr: IUsuario | null = await Usuario.findById(usuario._id);
        if(usr){
          for (let i = 0; i < usr.amigos.length; i++) {
            const element = usr.amigos[i];
            users.push(element)
          }
          const publicaciones: IPublicaciones | null | any = await Publicacion.find({usuario: {$in: users}}).sort({'createdAt': 1})
                .populate({path: "usuario"})
                .populate({path: "likes"})
          return { publicaciones, error: false, success: true, message: "Publicaciones enviadas con exito."}
        }
        
      } catch (error) {
        console.error(error)
        return {error: true, success: false, message: "Intentalo mas tarde."}
      }
    },
  },
  Mutation: {
    to_post: async (root: any, { data }: any, { usuario: usr }: any) => {
      const { texto } = data;
      try {
        const usuario: IUsuario | null | any = await Usuario.findById(
          usr._id
        );
        const new_publication = new Publicacion({
          texto,
          usuario: usuario._id
        })
        const publi = await new_publication.save()
        usuario.publicaciones.addToSet(publi._id);
        await usuario.save();
        const publication_sub = await Publicacion.findById(publi._id)
          .populate({path: 'likes'})
          .populate({path: 'usuario'})
        pubsub.publish(NEW_PUBLICATION, { get_post: publication_sub})
        return { error: false, success: true, message: "Publicado con exito." };
      } catch (err) {
        console.error(err);
        return {
          error: true,
          success: false,
          message: "Ocurrio un error al publicar.",
        };
      }
    },
    delete_post: async (root: any, { _id }: any, { usuario }: any)=>{
      try {
        const usr: IUsuario | null | any = await Usuario.findById(usuario._id)
        usr?.publicaciones.remove({_id})
        await usr.save()
        await Publicacion.deleteOne({_id})
        return {error: false, success: true, message: "Publicacion eliminada."}
      } catch (error) {
        console.error(error)
        return {error: true, success: false, message: "Error al eliminar una publicacion, intentlo mas tarde."}
      }
    },
    like_to_post: async (root: any, { _id }: any, { usuario }: any)=> {
      try {
        const publicacion: IPublicaciones | null | any = await Publicacion.findById(_id)
        publicacion?.likes.addToSet(usuario._id)
        await publicacion?.save()
        return {error: false, success: true, message: "Likeado con exito."}
      } catch (error) {
        console.error(error)
        return {error:true, success: false, message: "Error al likear publicacion, intentelo mas tarde."}
      }
    },
    dislike_to_post: async (root: any, { _id }: any, { usuario }: any)=> {
      try {
        const publicacion: IPublicaciones | null | any = await Publicacion.findById(_id)
        publicacion?.likes.remove(usuario._id)
        await publicacion?.save()
        return {error: false, success: true, message: "Deslikeado con exito."}
      } catch (error) {
        console.error(error)
        return {error:true, success: false, message: "Error al deslikear publicacion, intentelo mas tarde."}
      }
    }
  },
  Subscription: {
    get_post: {
      subscribe: ()=> pubsub.asyncIterator([NEW_PUBLICATION])
    }
  }
};
