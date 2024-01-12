import { Arista } from "../interfaces/Nodes";

function AristaNode({X,Y,X2}:Arista) {
  const d1 = 50;
 
  //360 deg derecha 180deg izquierda
  let rotacion=360;
  let d2=(X2-(X+100))+100;
  d2 < 0 ? d2=d2*-1 : d2=d2
  
  let translateX,translateY;
  if (rotacion===360){
    translateX = X2+100;
    translateY =Y+315+d1;

  }else{
    translateX=X2+100;
    translateY=Y+315+d1;
  }
  const d3 = 50;

  return (
    <>
    <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: d1 + 'px',
          height: '2px',
          transformOrigin: 'left center',
          transform: `translate(${X+100}px, ${Y+315}px) rotate(90deg)`,
          zIndex: -1
    }}></div>
    <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: d2 + 'px',
          height: '2px',
          transformOrigin: 'left center',
          transform: `translate(${X+100}px, ${Y+315+d1}px) rotate(${rotacion}deg)`,
          zIndex: -1

    }}></div>
    <div style={{
         position: 'absolute',
         backgroundColor: 'white',
         width: d3 + 'px',
         height: '2px',
         transformOrigin: 'left center',
         transform: `translate(${translateX}px, ${translateY}px) rotate(90deg)`,
         zIndex: -1
    }}></div>
    </>

  );
}

export default AristaNode;