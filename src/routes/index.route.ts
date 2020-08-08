import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';

const router = Router();

// Route users
router.use( '/v1/users', userRoute );
router.use( '/v1/auth', authRoute );

export default router;