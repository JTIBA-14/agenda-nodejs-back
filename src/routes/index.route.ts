import { Router } from 'express';
import userRoute from './user.route';

const router = Router();

// Route users
router.use( '/users', userRoute );

export default router;