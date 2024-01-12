import prisma from "../prisma";
import { Response } from "express"
import { RequestCustom } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const distanciaConyuge: number = 260;
const distancia_x_arista_conyuge: number = 210;
const distancia_y_arista_conyuge: number = 160;
const distancia_y_node: number = 410;
const distancia_x_node: number = 600;


export const nodesUser = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  try {
    const userNodes = await prisma.nodos.findMany({
      where: { userId: user },
    })

    if (userNodes.length === 0) {
      return res.json({ user: {}, code: 404, message: "No nodes found for this user" });
    }

    res.json(userNodes);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const aristasUser = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  try {
    const userAristas = await prisma.aristas.findMany({
      where: { userId: user },
    })

    if (userAristas.length === 0) {
      return res.json({ user: {}, code: 404, message: "No aristas found for this user" });
    }

    res.json(userAristas);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }

};

export const aristasConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;

  try {
    const userAristas = await prisma.aristasConyuge.findMany({
      where: { userId: user },
    })

    if (userAristas.length === 0) {
      return res.json({ user: {}, code: 404, message: "No aristasConyuge found for this user" });
    }

    res.json(userAristas);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const nodesConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  try {
    const userNodes = await prisma.nodosConyuge.findMany({
      where: { userId: user },
    })
    if (userNodes.length === 0) {
      return res.json({ user: {}, code: 404, message: "No nodesConyuge found for this user" });
    }
    res.json(userNodes);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  };
};

export const createConyuge = async (req: RequestCustom, res: Response) => {
  const userId = req.id;
  const nodeId = req.body.nodeId;

  try {

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const node = await prisma.nodos.findUnique({ where: { id: nodeId, userId: user.id } });
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    //insertar nodo conyuge
    const conyuge = await prisma.nodosConyuge.create({
      data: {
        nombre: 'editame',
        fechaNacimiento: 'editame',
        lugarNacimiento: 'editame',
        X: node.X + distanciaConyuge,
        Y: node.Y,
        userId: user.id,
      },
    });

    await prisma.aristasConyuge.create({
      data: {
        userId: user.id,
        rootId: node.id,
        conyugeId: conyuge.id,
        X: node.X + distancia_x_arista_conyuge,
        Y: node.Y + distancia_y_arista_conyuge,
      }
    });

    return res.json(conyuge);
    
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {

      console.error('Prisma client request error details:', error.meta);
      const conyuge = await prisma.nodosConyuge.findFirst({
        where: { userId: userId},
        orderBy: { id: 'desc' },
      })
      if (conyuge) {
        await prisma.nodosConyuge.delete({
          where: { id: conyuge.id },
        })
      }
    }
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createChild = async (req: RequestCustom, res: Response) => {
  const userId = req.id;
  const nodeId = req.body.nodeId;

  try {

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const node = await prisma.nodos.findUnique({ where: { id: nodeId, userId: userId }});
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    const relation = await prisma.aristas.findFirst({
      where: { rootId: nodeId, userId: userId },
      orderBy: { id: 'desc' },
    })
    if (!relation) {

      const childNode = await prisma.nodos.create({
        data: {
          nombre: 'editame',
          fechaNacimiento: 'editame',
          lugarNacimiento: 'editame',
          X: node.X,
          Y: node.Y + distancia_y_node,
          userId: user.id,
        },
      });

      //insertar arista
      await prisma.aristas.create({
        data: {
          X: node.X,
          Y: node.Y,
          X2: childNode.X,
          userId: user.id,
          rootId: node.id,
          childId: childNode.id,
        },
      });

      return res.json(childNode);
    }

    const lastChild = await prisma.nodos.findFirst({
      where: { userId: userId, id: relation.childId },
      orderBy: { id: 'desc' },
    })

    if (lastChild) {
      const childNode = await prisma.nodos.create({
        data: {
          nombre: 'editame',
          fechaNacimiento: 'editame',
          lugarNacimiento: 'editame',
          X: lastChild.X + distancia_x_node,
          Y: node.Y + distancia_y_node,
          userId: user.id,
        },
      });
      //insertar arista
      await prisma.aristas.create({
        data: {
          X: node.X,
          Y: node.Y,
          X2: childNode.X,
          userId: user.id,
          rootId: node.id,
          childId: childNode.id,
        },
      });

      return res.json(childNode);
    }

  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const nodeConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;

  try {
    const conyuge = await prisma.aristasConyuge.findFirst({
      where: { rootId: nodeId, userId: user },
      orderBy: { id: 'desc' },
    })

    if (!conyuge) {
      return res.json(false);
    }
    res.json(true);
  } catch (error) {
    console.error(error)
    return res.json(false);
  }
}

export const haveNodeDependencies = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;

  try{
    const conyuge = await prisma.aristasConyuge.findFirst({
      where: { rootId: nodeId, userId: user },
      orderBy: { id: 'desc' },
    })
    const child = await prisma.aristas.findFirst({
      where: { rootId: nodeId, userId: user },
      orderBy: { id: 'desc' },
    })

    if (!conyuge && !child) {
      return res.json(false);
    }
    res.json(true);
  }catch(error){
    console.error(error)
    return res.json(false);
  }
}

export const deleteConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;
  try{

    const aristaConyuge = await prisma.aristasConyuge.findFirst({
      where: { conyugeId: nodeId, userId: user },
    })

    if (aristaConyuge) {
      await prisma.aristasConyuge.delete({
        where: { id: aristaConyuge.id }
      })

      await prisma.nodosConyuge.delete({
        where: { id: aristaConyuge.conyugeId }
      })

      return res.json({ message: 'NodeConyuge deleted' });
    }

  }catch(error){
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export const deleteNode = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;

  try {
    const arista = await prisma.aristas.findFirst({
      where: { childId: nodeId, userId: user },
    })

    if (arista) {
      await prisma.aristas.delete({
        where: { id: arista.id },
      })

      await prisma.nodos.delete({
        where: { id: nodeId },
      })

      return res.json({ message: 'Node deleted' });
    }

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

