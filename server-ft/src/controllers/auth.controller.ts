import { Response } from "express"
import { RequestCustom } from "../types";
import { createAcessToken } from "../lib/jwt";
import bcrypt from 'bcryptjs'
import prisma from "../prisma";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokenSecret } from '../config';

export const register = async (req: RequestCustom, res: Response) => {
  const { username, password } = req.body;
  try {
    
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.json({ user: {}, code: 400, message: "El usuario ya existe" });
    }
    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username, 
        password: passwordhash,
      },
    });

    await prisma.nodos.create({
      data: {
        nombre: 'editame',
        fechaNacimiento: 'editame',
        lugarNacimiento: 'editame',
        X: 250,
        Y: 50,
        userId: newUser.id,
      },
    });

    const token = await createAcessToken(newUser.id.toString())
    res.cookie('token', token)

    res.json({
      user: {
        id: newUser.id,
        username: newUser.username
      },
      code: 200,
      message: "Usuario creado con exito."
    })

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const login = async (req: RequestCustom, res: Response) => {
  try {
    const { username, password } = req.body;

    const userFound = await prisma.user.findUnique({
      where: { username },
    });

    if (!userFound) {
      return res.json({ user:{ }, code:400,message:"Usuario no encontrado"})
    }

    const isMatch: boolean = await bcrypt.compare(password, userFound.password)

    if (!isMatch) {
      return res.json({user:{},code:400,message:"Usuario no encontrado"})
    }

    const token = await createAcessToken(userFound.id.toString());

    res.cookie("token", token)
    res.cookie("name", userFound.username)

    res.json({
      user: {
        id: userFound.id,
        username: userFound.username
      },
      code: 200,
      message: "Bienvenido"
    })

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const logout = async (_req:RequestCustom,res:Response)=>{
  res.clearCookie("token")
  return res.json({code:200,message:"Sesion cerrada"})
}
 
export const getUsers = async (_req: RequestCustom, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users)
} 

export const profile = async (req: RequestCustom, res: Response) => {
    const user = req.id;
    const userFound = await prisma.user.findUnique({
    where: { id:user },
  })
  if(!userFound) return res.status(404).json({message:"Usuario no encontrado"})
  res.json({id:userFound.id,username:userFound.username});
}

export const verifyToken = async (req: RequestCustom, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('No token provided verify');
    return res.json({code:401,message:"Token not provided"})
  }

  jwt.verify(token, tokenSecret, {}, (err: Error | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      console.log('Error verifying token:', err);
      return res.json({code:401,message:"Error verify token"})
    }

    if (typeof decoded === 'object' && 'data' in decoded) {
      return res.json({code:400,message:"Token is valid"})
    }
  });
}