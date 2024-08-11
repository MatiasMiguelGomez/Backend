import { Router } from 'express';
import passport from 'passport';
import usersControlers from '../controlers/users.controlers.js';

const router = Router();

router.post('/register', passport.authenticate('register'), usersControlers.registerUser);

router.post('/login', passport.authenticate('login'), usersControlers.loginUser);

export default router;
