import { Router } from "express";
import { login,register,getUsers,logout,profile,verifyToken} from "../controllers/auth.controller";
import {authRequired} from "../middlewares/validateToken";


const router = Router();

router.post("/register",register);

router.post("/login",login);

router.get("/logout",logout);

router.get('/users',getUsers);

router.get('/verify',verifyToken);

router.get('/profile',authRequired ,profile);

export default router;
