import express from 'express';
import { allUser, login, register } from '../Controller/User.js';
const router = express.Router();

// register user
router.post("/register",register); //api/user/register
router.post("/login",login) //api/user/login
router.get("/alluser",allUser) //api/user/allUser
export default router