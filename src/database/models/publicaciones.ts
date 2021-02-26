import { Schema, model, SchemaDefinition, Document, Model } from "mongoose";

export interface IPublicaciones extends Document {
  texto: String;
  usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
  likes: [ { type: Schema.Types.ObjectId, ref: "usuarios" } ],
  comments: [ { type: Schema.Types.ObjectId, ref: "comentarios" } ],
}

const esquema_publicaciones: SchemaDefinition = {
  texto: String,
  usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
  likes: [ { type: Schema.Types.ObjectId, ref: "usuarios" } ],
  comments: [ { type: Schema.Types.ObjectId, ref: "comentarios" } ],
};

const Publicaciones: Schema<
  Document<any>,
  Model<Document<any>>,
  undefined
> = new Schema(esquema_publicaciones, { timestamps: true });

export default model<IPublicaciones>("publicaciones", Publicaciones);
