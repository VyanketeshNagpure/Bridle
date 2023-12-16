import express from 'express';

import { addUser, getAllUsers, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/signUp', addUser);
router.post('/login', login );
// router.post('/loginUsingGmail',loginWithGmail);
router.get('/getAllUsers', getAllUsers);
export default router;