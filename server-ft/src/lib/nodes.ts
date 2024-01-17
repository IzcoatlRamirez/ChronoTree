import prisma from "../prisma";

export interface Node{ 
    id: number; 
    imageUrl: string | null; 
    nombre: string; fechaNacimiento: string; 
    lugarNacimiento: string; userId: number; 
    X: number; 
    Y: number; 
}

export interface Arista{
    id: number;
    X: number;
    Y: number;
    X2: number;
}

export interface AristaConyugal{
    id: number;
    X: number;
    Y: number;
}

export const getParentNode = async (nodeId:number,userId:number) => {
    
    const currentNode = await prisma.nodos.findFirst({
        where: { id: nodeId, userId: userId },
    })

    if(!currentNode){
        return;
    }

    const parentNodeId = await prisma.aristas.findFirst({
        where: { childId: currentNode.id, userId: userId }
    })
    
    if(!parentNodeId){
        return;
    }

    const parentNode = await prisma.nodos.findFirst({
        where: { id: parentNodeId.rootId, userId: userId },
    })

    return parentNode;
}

/* Funcion que busque los nodos mayores o iguales pero que sean hermanos del current Node */
export const getNodesGte = async (nodeId:number,userId:number,idFilter:number):Promise<Node[]>=> {
    const currentNode = await prisma.nodos.findFirst({
        where: { id: nodeId, userId: userId },
    })

    if(!currentNode){
        return [];
    }

    //busca todas las aristas donde el currentNode es el padre
    const relationsId = await prisma.aristas.findMany({
        where: { rootId: currentNode.id, userId: userId }
    })


    const childNodesPromise = relationsId.map(async (relation) => {
        const node = await prisma.nodos.findFirst({
            where: {id:relation.childId, userId: userId },
        })
        return node;
    })

    const childNodes = (await Promise.all(childNodesPromise)).filter(node => node !== null) as Node[];
   
    const nodesGte = childNodes.filter((node)=> {
        if(!node){
             return false;
        }
        return node.id >= idFilter;
    })
   
    return nodesGte;
}

/* Funcion que busque los conyuges de una lista de nodos */
export const getConyuges = async (nodes: Node[], userId: number) => {
    const relationsIdPromises = nodes.map(async (node) => {
      const relationsId = await prisma.aristasConyuge.findMany({
        where: { rootId: node.id, userId: userId },
      });
      return relationsId;
    });
  
    const relationsId = await Promise.all(relationsIdPromises);
  
    const conyugesPromises = relationsId.map(async (relationsId) => {
      const conyuges = await Promise.all(
        relationsId.map(async (relation) => {
          const node = await prisma.nodosConyuge.findFirst({
            where: { userId: userId, id: relation.conyugeId },
          });
          return node;
        })
      );
      return conyuges;
    });
  
    const conyuges = await Promise.all(conyugesPromises);

    return conyuges;
};

/*Funcion que busque las aristas de una lista de nodos */
export const getAristas = async (nodes:Node[],userId:number):Promise<Arista[]> => {

    const aristasPromises = nodes.map(async (node) => {
        const aristas = await prisma.aristas.findFirst({
            where: { childId: node.id, userId: userId },
        });
        return aristas;
    });

    const aristas = (await Promise.all(aristasPromises)).filter(arista => arista !== null) as Arista[];
        
    return aristas;
}

/* Funcion que busque las aristas conyuge de una lista de nodos*/

export const getAristasConyuge = async (nodes:Node[],userId:number): Promise<AristaConyugal[]> => {
    const aristasConyugePromises = nodes.map(async (node) => {
        const aristas = await prisma.aristasConyuge.findFirst({
            where: { rootId: node.id, userId: userId },
        });
        return aristas;
    });
    const aristas = (await Promise.all(aristasConyugePromises)).filter(arista => arista !== null) as AristaConyugal[];
    return aristas;
}

export const IsOccupied = async(X:number,Y:number) => {
    const isOccupied = await prisma.nodos.findFirst({
        where: { X: X, Y: Y },
    });
    if(isOccupied){
        return true;
    }
    return false;
}