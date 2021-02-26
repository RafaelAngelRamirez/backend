import express, { Application } from "express";
import { Server, createServer } from "http";
//APOLLO SERVER
import { ApolloServer } from "apollo-server-express";
//VARIABLES DE ENTORNOS
import { config } from "dotenv";
config()
//PASSPORT
import passport from "passport";
//BASE DE DATOS
import "./database/connection";
import "reflect-metadata";
//SCHEMA
import schema from "./graphql";

//config
const app: Application = express();
const httpServer: Server = createServer(app);
app.set("port", process.env.PORT || 8080);

//middleware
app.use(passport.initialize());

//apollo server
const serverApollo = new ApolloServer(schema);
serverApollo.applyMiddleware({ app });
serverApollo.installSubscriptionHandlers(httpServer);

//listener
httpServer.listen(app.get("port"), () => {
  console.log(
    `🚀 Server ready at ${process.env.URLHTTPS || "http://localhost"}:${app.get("port")}${
      serverApollo.graphqlPath
    }`
  );
  console.log(
    `🚀 Subscriptions ready at ${process.env.URLWS || "ws://localhost"}:${app.get("port")}${
      serverApollo.subscriptionsPath
    }`
  );
  console.log(`Servidor escuchando en el puerto: ${app.get("port")}`);
});
