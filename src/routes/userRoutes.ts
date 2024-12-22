import express, { Request, Response } from 'express';
import { updateUser, deleteUser, getAllUsers } from '../controllers/userController';

const router = express.Router();

// Define other routes
router.get('/', getAllUsers);     
router.put('/:id', updateUser);      
router.delete('/:id', deleteUser);    

export default router;
