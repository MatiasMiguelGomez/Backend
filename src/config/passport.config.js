import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import userDao from '../dao/mongoDB/user.dao.js';
import cartDao from '../dao/mongoDB/cart.dao.js';
import { hashPassword, validateHash } from '../utils/hashPassword.js';
import envsConfig from './envs.config.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';

const ExtractJwt = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

export const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          const userExist = await userDao.findUser({ email: username });
          if (userExist) return done(null, false);
          const cart = await cartDao.createCart();

          const newUser = {
            first_name,
            last_name,
            email: username,
            password: hashPassword(password),
            age,
            cart_id: cart._id,
          };
          const userCreated = await userDao.addUser(newUser);

          return done(null, userCreated);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email', secretOrPrivateKey: envsConfig.JWT_SECRET_CODE },
      async (username, password, done) => {
        try {
          const user = await userDao.findUser({ email: username });
          if (!user || !validateHash(user.password, password)) {
            return done(null, false);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: envsConfig.JWT_SECRET_CODE,
      },
      async (jwt_payload, done) => {
        try {
          const user = await userDao.findUser({ email: jwt_payload.email });
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.findUser({ id: id });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
