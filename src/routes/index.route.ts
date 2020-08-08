import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';

const router = Router();

// Route users
router.use( '/users', userRoute );
router.use( '/auth', authRoute );

export default router;