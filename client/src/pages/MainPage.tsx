import { useState, useEffect } from "react";
import {getNodes,getAristasConyuge,getNodosConyuge,getAristas} from "../services/NodesService";
import {Box} from "@mui/material";
import ZoomButton from "../components/ZoomButton";
import { Node,AristaConyugal,Arista } from "../interfaces/Nodes";
import SwipeableTemporaryDrawer from "../components/Drawer";
import NodoConyuge from "../components/NodoConyuge";
import AristaConyuge from "../components/AristaConyuge";
import AristaNode from "../components/AristaNode";
import Nodo from "../components/Nodo"


function MainPage() {

  const [zoomLevel, setZoomLevel] = useState(100);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [aristas, setAristas] = useState<Arista[]>([]);
  const [nodesConyuge, setNodesConyuge] = useState<Node[]>([]);
  const [aristasConyuge, setAristasConyuge] = useState<AristaConyugal[]>([]);

  useEffect(() => {
    const fetchNodes = async () => {
     try{
      const nodes = await getNodes();
      setNodes(nodes.data);
     }catch(error){
       console.log(error)
     }
    };

    //renderizar aristas
    const fetchAristas = async () => {
      try{
        const aristas= await getAristas();
        setAristas(aristas.data);
      }catch(error){
        console.log(error)
      }
    };
    
    //renderizar nodosConyuge
    const fetchNodesConyuge = async () => {
      try{
        const nodesConyuge = await getNodosConyuge();
      setNodesConyuge(nodesConyuge.data);
      }catch(error){
        console.log(error)
      }
      
    };

    //renderizar aristasconyuge
    const fetchAristasConyuge = async () => {
     try{
      const aristasConyuge = await getAristasConyuge();
      setAristasConyuge(aristasConyuge.data);
      console.log(aristasConyuge.data)
     }catch(error){
       console.log(error)
     }
    };

    /* cada vez que se agrege un nodo hijo o un nodo conyuge debe agregarse el nodo respectivo con su arista respectiva
     *  y se renderizaran estos cuatro tipos de componentes desde esta pagina principal */
    fetchNodes();
    fetchNodesConyuge();
    fetchAristasConyuge();
    fetchAristas();

  },[]);

  const updateNodes = async () => {
    try{
      const nodes = await getNodes();
      const aristasNode= await getAristas();
      setNodes(nodes.data);
      setAristas(aristasNode.data);
    }catch(error){  
      console.log(error)
    }
  };

  const updateNodesConyuge = async () => {
    try{
      const nodesConyuge = await getNodosConyuge();
      const aristasConyuge = await getAristasConyuge();
      setNodesConyuge(nodesConyuge.data);
      setAristasConyuge(aristasConyuge.data);
    }catch(error){  
      console.log(error)
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  return (
    <>
    <div>
    <ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </div>
    <Box sx={{mt:2,position:'fixed', display: 'inline', zIndex: 1, left: 50, top: 15}}>
      <SwipeableTemporaryDrawer/>
    </Box>
    <div style={{ transform: `scale(${zoomLevel / 100})`,width:'100vh'}}>
  
    { nodes && nodes.length > 0 && nodes.map((node) => (
        <Nodo
          key={node.id}
          id={node.id}
          X={node.X}
          Y={node.Y}
          nombre={node.nombre}
          fechaNacimiento={node.fechaNacimiento}
          lugarNacimiento={node.lugarNacimiento}
          updateNodes={updateNodes}
          updateNodesConyuge={updateNodesConyuge}
        />
      ))}

      {nodesConyuge && nodesConyuge.length > 0 && nodesConyuge.map((node) => (
        <NodoConyuge
          key={node.id}
          id={node.id}
          X={node.X}
          Y={node.Y}
          nombre={node.nombre}
          fechaNacimiento={node.fechaNacimiento}
          lugarNacimiento={node.lugarNacimiento}
          updateNodes={updateNodes}
          updateNodesConyuge={updateNodesConyuge}
        />
      ))}

      {aristasConyuge && aristasConyuge.length > 0 && aristasConyuge.map((arista) => (
        <AristaConyuge
          key={arista.id}
          id={arista.id}
          X={arista.X}
          Y={arista.Y}
        />
      ))}

       {aristas && aristas.length > 0 && aristas.map((arista) => (
        <AristaNode
        key={arista.id}
        id={arista.id}
        X={arista.X}
        Y={arista.Y}
        X2={arista.X2}
        />))} 

        {/* <Nodo id={2} nombre="hijo1" fechaNacimiento="6 de mayo del 2003" X={250} Y={460} updateNodes={updateNodesConyuge}></Nodo>
        <AristaNode id={5} X={250} Y={50} X2={250}></AristaNode> */}
    </div>
    </>
  )
}

export default MainPage
