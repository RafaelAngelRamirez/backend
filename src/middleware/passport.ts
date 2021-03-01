import Usuario, { IUsuario } from "../database/models/usuario";
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
const { JSW_SECRET } = process.env;
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JSW_SECRET || "secret",
};

export default new Strategy(opts, async (payload: any, done: VerifiedCallback) => {
  try {
    const user: IUsuario | null = await Usuario.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, null);
  } catch (error) {
    console.log(error);
  }
});
