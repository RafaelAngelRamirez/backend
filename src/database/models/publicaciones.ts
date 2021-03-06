import { Schema, model, SchemaDefinition, Document, Model } from "mongoose";
import { IUsuario } from './usuario'
import { IComentarios } from './comentarios'

export interface IPublicaciones extends Document {
  texto: String;
  usuario: IUsuario,
  likes:  IUsuario[],
  comments: IComentarios[],
  file: {url: String}[]
}

const esquema_publicaciones: SchemaDefinition = {
  texto: String,
  usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
  likes: [ { type: Schema.Types.ObjectId, ref: "usuarios" } ],
  comments: [ { type: Schema.Types.ObjectId, ref: "comentarios" } ],
  file: [ { url: String } ],
};

const Publicaciones: Schema<
  Document<any>,
  Model<Document<any>>,
  undefined
> = new Schema(esquema_publicaciones, { timestamps: true });

export default model<IPublicaciones>("publicaciones", Publicaciones);
