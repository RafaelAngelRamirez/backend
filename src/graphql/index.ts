//APOLLO-SERVER
import { ApolloServerExpressConfig } from "apollo-server-express";
//JSONWEBTOKEN
import { verify } from "jsonwebtoken";
//HERRAMIENTAS DE GRAPHQL Y GRAPHQL-TOOLS
import { stitchSchemas } from "@graphql-tools/stitch";
import { makeExecutableSchema } from "@graphql-tools/schema";
//MODELS
import Usuario, { IUsuario } from "../database/models/usuario";
//AUTENTICACION
import { TypeDefsAuthentication } from "./typeDefs/authentication";
import { ResolverAuthentication } from "./resolvers/authentication";
//FRIENDS
import { TypeDefsFriends } from "./typeDefs/friends";
import { ResolverFriends } from "./resolvers/friends";
//USER
import { TypeDefsUser } from "./typeDefs/user";
import { ResolverUser } from "./resolvers/user";
//PUBLICATIONS
import { TypeDefsPublications } from "./typeDefs/publications";
import { ResolverPublications } from "./resolvers/publications";

const schemaAuthentication = makeExecutableSchema({
  typeDefs: TypeDefsAuthentication,
  resolvers: ResolverAuthentication,
});
const schemaUser = makeExecutableSchema({
  typeDefs: TypeDefsUser,
  resolvers: ResolverUser,
});
const schemaFriends = makeExecutableSchema({
  typeDefs: TypeDefsFriends,
  resolvers: ResolverFriends,
});
const schemaPublications = makeExecutableSchema({
  typeDefs: TypeDefsPublications,
  resolvers: ResolverPublications,
});

const configApollo: ApolloServerExpressConfig = {
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
  schema: stitchSchemas({
    subschemas: [
      schemaAuthentication,
      schemaUser,
      schemaFriends,
      schemaPublications,
    ],
  }),
  context: async ({ req, res, connection }) => {
    if (connection) {
      const token = connection.context.authorization?.split(" ")[1] || "";
      if (token) {
        const { id }: any = verify(token, "secret");
        const usuario = await Usuario.findById(id)
          .populate({ path: "amigos" })
          .populate({ path: "solicitudes_enviadas" })
          .populate({ path: "solicitudes_recibidas" })
          .populate({ path: "publicaciones" });
        return { req, res, usuario };
      }
      return { req, res };
    } else {
      const token: string | undefined = req.headers.authorization?.split(
        " "
      )[1];
      if (token) {
        const { id }: any = verify(token, "secret");
        const usuario = await Usuario.findById(id)
          .populate({ path: "amigos" })
          .populate({ path: "solicitudes_enviadas" })
          .populate({ path: "solicitudes_recibidas" })
          .populate({ path: "publicaciones" });
        return { req, res, usuario };
      }
      return { req, res };
    }
  }
};
export default configApollo;
