import { Router } from 'express';
import { UserController } from './../controller/UserController';

const router = Router();

//List all users
router.get('/', UserController.getAll );
//create user
router.post('/', UserController.create );
//List user with id
router.get('/:id', UserController.show );
//edit user
router.put('/:id', UserController.update );
//delete user
router.delete('/:id', UserController.destroy );

export default router;