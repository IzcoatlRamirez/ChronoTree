import { AristaConyugal } from "../interfaces/Nodes";

function AristaConyuge({ X, Y }:AristaConyugal) {
  const d1 = 50;

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: d1 + "px",
          height: "2px",
          transformOrigin: "left center",
          transform: `translate(${X}px, ${Y}px) rotate(360deg)`,
          zIndex: -1,
        }}
      ></div>

    </>
  );
}

export default AristaConyuge;
