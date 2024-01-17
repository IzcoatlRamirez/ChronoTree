import React from "react";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Box, Button, Typography,Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import {ChangeEvent,SyntheticEvent} from "react";
import { green,red } from "@mui/material/colors";
import { NodeRoot } from "../interfaces/Nodes";
import { uploadImageNodeC } from "../services/NodesService";
import MuiAlert from "@mui/material/Alert";


const UploadFileConyuge = ({id,updateNodesConyuge}:NodeRoot) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [color, setColor] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [open,setOpen]=useState(false);

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Mostrar la imagen en la interfaz
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    // Mostrar la imagen en la interfaz
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleButtonClick = () => {
    // Abre el cuadro de diálogo de selección de archivo cuando se hace clic en el botón
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleUploadFile = async () => {
    if (!file){
      setMessageSnackbar("No se ha seleccionado ningún archivo");
      setColor(red[500]);
      setOpen(true);
      return;
    }
    const formData = new FormData();
    formData.append("imageUrl",file);
    formData.append("nodeId",id.toString());
    try{
        const response = await uploadImageNodeC(formData);
        console.log(response.data.message);
        setMessageSnackbar(response.data.message);
        setColor(green[500]);
        setOpen(true);
      }catch(error){
        console.log(error);
      }
      finally{
        updateNodesConyuge();
      }
};

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ maxWidth:200 , minWidth: 200 }}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          style={{
            border: "2px dashed #aaa",
            padding: "20px",
            textAlign: "center",
            color: "white",
            maxWidth: 200,
            minWidth: 200,
            maxHeight: 200,
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {imageUrl ? (
            <div>
              <img
                src={imageUrl}
                alt="Imagen seleccionada"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          ) : (
            <React.Fragment>
              <FileOpenIcon
                sx={{ color: "#aaa", ml: "35%", mt: "2rem", fontSize: 56 }}
              />
              <Typography sx={{color:'#aaa'}}>Arrastra una foto aquí</Typography>
            </React.Fragment>
          )}
        </div>

        <Box sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 1 }}> 
         <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Seleccionar Archivo
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleUploadFile}>
            Subir
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              sx={{ backgroundColor: color }}
            >
              {messageSnackbar}
            </MuiAlert>
          </Snackbar>
    </div>
  );
};

export default UploadFileConyuge;