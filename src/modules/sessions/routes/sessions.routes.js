import { Router } from 'express';
import passport from 'passport';
import { current } from '../controllers/sessions.controllers.js';

const router = Router();

router.get('/current', passport.authenticate('jwt', { session: false }), current);

export default router;
