import {
  Schema,
  model,
  SchemaDefinition,
  Document,
  NativeError,
  Model,
} from "mongoose";
import bcrypt from "bcrypt";
import { IPublicaciones } from "./publicaciones";

export interface IUsuario extends Document {
  nombre: String;
  apellido: String;
  usuario: String;
  email: String;
  password: String;
  password2?: String;
  amigos: IUsuario[] | [Schema.Types.ObjectId];
  avatar: String;
  portada: String;
  socket: string,
  publicaciones: IPublicaciones[] | [Schema.Types.ObjectId];
  historial: {
    busqueda: IUsuario[] | [Schema.Types.ObjectId];
  };
  solicitudes: [
    {
      tipo: String;
      usuario: Schema.Types.ObjectId | IUsuario;
      createdAt: Date;
    }
  ];
  preferencias: {
    private: Boolean;
    showViewMessage: Boolean;
  };
  passwordValidate: (password: string) => Promise<boolean>;
}

const esquema_usuario: SchemaDefinition = {
  nombre: {
    type: String,
    require: [true, "Ingrese su nombre."],
    lowercase: true,
  },
  apellido: {
    type: String,
    required: [true, "Ingrese su apellido"],
    lowercase: true,
  },
  usuario: {
    type: String,
    required: [true, "Ingrese un nombre de usuario."],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    require: [true, "Ingrese su email"],
    unique: true,
  },
  avatar: { type: String, default: "" },
  portada: { type: String, default: "" },
  socket: { type: String, default: "" },
  publicaciones: [
    {
      type: Schema.Types.ObjectId,
      ref: "publicaciones",
    },
  ],
  direcion: {
    ciudad: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  password: {
    type: String,
    require: [true, "Ingrese una contraseña."],
    minlength: 6,
  },
  amigos: [
    {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
    },
  ],
  historial: {
    busqueda: [
      {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
      },
    ],
  },
  solicitudes_enviadas: [
    {
      usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
      createdAt: { type: Date, default: new Date() },
      leido: { type: Boolean, default: false },
    },
  ],
  solicitudes_recibidas: [
    {
      usuario: { type: Schema.Types.ObjectId, ref: "usuarios" },
      createdAt: { type: Date, default: new Date() },
      leido: { type: Boolean, default: false },
    },
  ],
  preferencias: {
    private: { type: Boolean, default: false },
    showViewMessage: { type: Boolean, default: true },
  },
};

const Usuario: Schema<
  Document<any>,
  Model<Document<any>>,
  undefined
> = new Schema(esquema_usuario, { timestamps: true });

Usuario.pre<IUsuario>(
  "save",
  async function (next: (err?: NativeError | null | undefined) => void) {
    if (!this?.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  }
);

Usuario.methods.passwordValidate = async function (
  password: string
): Promise<Boolean> {
  const usuario: IUsuario | any = this;
  return await bcrypt.compare(password, usuario.password);
};

export default model<IUsuario>("usuarios", Usuario);
