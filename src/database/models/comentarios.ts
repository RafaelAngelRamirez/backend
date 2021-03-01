import { Schema, model, SchemaDefinition, Document, Model } from "mongoose";
//INTERFACE
import { IUsuario } from './usuario'
export interface IComentarios extends Document {
  _id: Schema.Types.ObjectId,
  texto: String;
  usuario: IUsuario;
  likes: IUsuario[];
}

const esquema_comentarios: SchemaDefinition = {
  texto: String,
  usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
  likes: [{ type: Schema.Types.ObjectId, ref: "usuarios" }],
};

const Comentarios: Schema<
  Document<any>,
  Model<Document<any>>,
  undefined
> = new Schema(esquema_comentarios, { timestamps: true });

export default model<IComentarios>("comentarios", Comentarios);
