import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
  try {

    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.json({ code:400, msg: 'El nombre de usuario ya está en uso',user:{}});
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    res.json({code:201, msg:"Usuario registrado con exito.", user: newUser});
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    const isMatch = user.password === password;
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}