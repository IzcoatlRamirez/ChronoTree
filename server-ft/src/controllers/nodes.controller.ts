import prisma from "../prisma";
import { getParentNode,getNodesGte,getConyuges,getAristas,getAristasConyuge,IsOccupied} from "../lib/nodes";
import { Response } from "express"
import { RequestCustom } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import fs from 'fs';
import path from "path";

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
    });

    if (userNodes.length === 0) {
      return res.json({ user: {}, code: 404, message: "No nodes found for this user" });
    }

    // Lee el contenido de cada imagen y agrégalo al nodo
    const nodesWithImages = await Promise.all(
      userNodes.map(async (node) => {
        if (!node.imageUrl) {
          return node;
        }
        const imagePath = path.join(__dirname, '../../', node.imageUrl); // Ruta completa de la imagen
        const imageContent = await fs.promises.readFile(imagePath, 'base64'); // Lee el contenido de la imagen

        return {
          ...node,
          imageUrl: `data:image/jpeg;base64,${imageContent}`, // Agrega el contenido base64 al nodo
        };
      })
    );

    res.json(nodesWithImages);
  } catch (error) {
    console.error(error);
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

// export const nodesConyuge = async (req: RequestCustom, res: Response) => {
//   const user = req.id;
//   try {
//     const userNodes = await prisma.nodosConyuge.findMany({
//       where: { userId: user },
//     })
//     if (userNodes.length === 0) {
//       return res.json({ user: {}, code: 404, message: "No nodesConyuge found for this user" });
//     }
//     res.json(userNodes);
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: 'Something went wrong' });
//   };
// };

export const nodesConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;

  try {
    const userNodes = await prisma.nodosConyuge.findMany({
      where: { userId: user },
    });

    if (userNodes.length === 0) {
      return res.json({ user: {}, code: 404, message: "No nodesConyuge found for this user" });
    }

    // Lee el contenido de cada imagen y agrégalo al nodo
    const nodesWithImages = await Promise.all(
      userNodes.map(async (node) => {
        if (!node.imageUrl) {
          return node;
        }
        const imagePath = path.join(__dirname, '../../', node.imageUrl); // Ruta completa de la imagen
        const imageContent = await fs.promises.readFile(imagePath, 'base64'); // Lee el contenido de la imagen

        return {
          ...node,
          imageUrl: `data:image/jpeg;base64,${imageContent}`, // Agrega el contenido base64 al nodo
        };
      })
    );

    res.json(nodesWithImages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
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

    //busca si el nodo tiene hijos
    const relation = await prisma.aristas.findFirst({
      where: { rootId: nodeId, userId: userId },
      orderBy: { id: 'desc' },
    })

    //mientras el lugar de insercion este ocupado , recorre a toda la prole respectivamente
    //en el momento donde la posicion de la insercion este libre, inserta el hijo

    const nodeParent = await getParentNode(nodeId, user.id);
    console.log("NodeParent is ", nodeParent);

    if(nodeParent){
      const nodesGte = await getNodesGte(nodeParent.id, user.id,node.id);
      console.log("NodesGte is ", nodesGte);
      const conyuges = await getConyuges(nodesGte, user.id);
      console.log("Conyuges is ", conyuges);
      const aristas = await getAristas(nodesGte, user.id);
      console.log("Aristas is ", aristas);
      const aristasConyuge = await getAristasConyuge(nodesGte, user.id);
      console.log("AristasConyuge is ", aristasConyuge);
    }

    //si no tiene hijos inserta el hijo justo debajo del current node
    if (!relation) {

      if(await IsOccupied(node.X,node.Y + distancia_y_node)){
        console.log("IsOccupied is true !relation")
      }else{
      console.log("IsOccupied is false !relation")
      }
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

      if(await IsOccupied(lastChild.X + distancia_x_node, node.Y + distancia_y_node)){
        console.log("IsOccupied is true relation")
      }
      else{
        console.log("IsOccupied is false relation")
      }
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

//recibe todos los parametros necesarios para actualizar un nodo en el request body
export const uploadNode = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;
  const imageUrl = req.body.imageUrl;
  const nombre = req.body.nombre;
  const fechaNacimiento = req.body.fechaNacimiento;
  const fechaDefuncion = req.body.fechaDefuncion;
  const lugarNacimiento = req.body.lugarNacimiento;

  try {
    const node = await prisma.nodos.findFirst({
      where: { id: nodeId, userId: user },
    })

    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    await prisma.nodos.update({
      where: { id: nodeId },
      data: {
        imageUrl: imageUrl,
        nombre: nombre,
        fechaNacimiento: fechaNacimiento,
        fechaDefuncion: fechaDefuncion? fechaDefuncion : null,
        lugarNacimiento: lugarNacimiento,
      }
    })

    return res.json({ message: 'Node updated' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export const uploadNodeConyuge = async (req: RequestCustom, res: Response) => {
  const user = req.id;
  const nodeId = req.body.nodeId;
  const nombre = req.body.nombre;
  const fechaNacimiento = req.body.fechaNacimiento;
  const fechaDefuncion = req.body.fechaDefuncion;
  const lugarNacimiento = req.body.lugarNacimiento;

  try {
    const node = await prisma.nodos.findFirst({
      where: { id: nodeId, userId: user },
    })

    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    await prisma.nodosConyuge.update({
      where: { id: nodeId },
      data: {
        nombre: nombre,
        fechaNacimiento: fechaNacimiento,
        fechaDefuncion: fechaDefuncion? fechaDefuncion : null,
        lugarNacimiento: lugarNacimiento,
      }
    })

    return res.json({ message: 'Node updated' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export const uploadImageNode = async (req: RequestCustom, res: Response) => {
  const nodeId:string = req.body.nodeId;
  const id:number = parseInt(nodeId);

  try{
    if(!req.file){
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = req.file.path;

    await prisma.nodos.update({
      where: { id: id },
      data: {
        imageUrl: imageUrl,
      }
    });
    
    return res.json({ message: 'Image uploaded' });
  }catch(error){
    console.error(error)
    return res.json({ message: 'Something went wrong' });
  }
}

export const uploadImageNodeConyuge = async (req: RequestCustom, res: Response) => {
  const nodeId:string = req.body.nodeId;
  const id:number = parseInt(nodeId);

  try{
    if(!req.file){
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = req.file.path;

    await prisma.nodosConyuge.update({
      where: { id: id },
      data: {
        imageUrl: imageUrl,
      }
    });
    
    return res.json({ message: 'Image uploaded' });
  }catch(error){
    console.error(error)
    return res.json({ message: 'Something went wrong' });
  }
}
