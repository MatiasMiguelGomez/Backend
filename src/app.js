import express from 'express';
import session from 'express-session';
import routes from './routes/index.routes.js';
import { connectMongoDB } from './config/mongoDB.config.js';
import envs from './config/envs.config.js';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: envs.SECRET_CODE, resave: true, saveUninitialized: true }));
app.use(cookieParser());
connectMongoDB();
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(envs.PORT, () => {
  console.log(`The port ${envs.PORT} is being listened to`);
});
