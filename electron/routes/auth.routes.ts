import { Router } from "express";
import { login,register,getUsers } from "../controllers/auth.controller";

const router = Router();

router.post("/register",register);

router.post("/login",login);

router.get('/users',getUsers)


export default router;
