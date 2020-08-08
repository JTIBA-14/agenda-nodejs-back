import { Router } from 'express';
import { AuthController } from './../controller/AuthController';

const router = Router();

//SingIn User
router.post('/singin', AuthController.signIn );

export default router;