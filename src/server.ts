import express, { Application } from "express";
import { Server, createServer } from 'http'
import morgan from 'morgan'
import cors from "cors";
//MIDDLEWARE
import passport from "passport";
import Auth from './middleware/passport'
//BASE DE DATOS
import "./database/connection";
//SOCKET.IO
import { connection } from './socket'
//VARIABLES DE ENTORNOS
import { config } from "dotenv";
config();
//ROUTERS
import Authentication from "./routers/authentication.routes";
import User from "./routers/user.routes";
import Friends from "./routers/friends.routes";
import Publication from "./routers/publications.routes";

class ServerApp {
  
  private app: Application;
  private server: Server

  constructor() {
    this.app = express();
    this.server = createServer(this.app)
    this._Config();
    this._Routers();
  }

  private _Config() {
    this.app.set("port", process.env.PORT || 8080);
    this.app.use(morgan("dev"))
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(passport.initialize());
  }

  private _Routers() {
    //PUBLIC ROUTERS
    this.app.use("/api/v1/pu", Authentication);
    //PRIVATE ROUTERS
    this.app.use("/api/v1/pr", passport.authenticate(Auth, { session: false }), User);
    this.app.use("/api/v1/pr", passport.authenticate(Auth, { session: false }), Friends);
    this.app.use("/api/v1/pr", passport.authenticate(Auth, { session: false }), Publication);
  }

  public _Start() {
    this.server.listen(this.app.get("port"), () => {
      console.log("Servidor escuchando en el puerto", this.app.get("port"));
      connection(this.server)
    });
  }
}

new ServerApp()._Start();
