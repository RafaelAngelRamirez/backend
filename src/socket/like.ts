import { getSocket } from '../socket'
//MODELS
import Publicacion, { IPublicaciones } from '../database/models/publicaciones'

getSocket().on("NEW_LIKE_REQUEST", async (value) => {
  const { user }: any = getSocket()
  try {
    const publicacion: IPublicaciones | any = await Publicacion.findById(value.data);
    publicacion.likes.addToSet(user._id);
    const res = await publicacion.save();
    getSocket().emit("NEW_LIKE_RESPONSE", {publicacion: res, usuario: user, error: false})
  } catch (error) {
    console.error(error);
    getSocket().emit("NEW_LIKE_RESPONSE", {error: true})
  }
})

getSocket().on("NEW_DISLIKE_REQUEST", async (value) => {
  const { user }: any = getSocket()
  try {
    const publicacion: IPublicaciones | any = await Publicacion.findById(value.data);
    publicacion.likes.remove(user._id);
    const res = await publicacion.save();
    getSocket().emit("NEW_DISLIKE_RESPONSE", {publicacion: res, usuario: user, error: false})
  } catch (error) {
    console.error(error);
    getSocket().emit("NEW_DISLIKE_RESPONSE", {error: true})
  }
})