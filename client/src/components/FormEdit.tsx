import { NodeRoot} from "../interfaces/Nodes"
import { Box, Button, Divider, TextField,Snackbar} from "@mui/material"
import UploadFile from "./UploadFile"
import { ChangeEvent,useState,SyntheticEvent } from "react"
import InputAdornment from "@mui/material/InputAdornment";
import DateRangeIcon from '@mui/icons-material/DateRange';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MuiAlert from "@mui/material/Alert";
import { green } from "@mui/material/colors";
import { uploadNode } from "../services/NodesService";

function FormEdit({id,updateNodes,updateNodesConyuge}:NodeRoot) {

  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [dateOfDeath, setDateOfDeath] = useState<string | undefined>("");

  const [color, setColor] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [open,setOpen]=useState(false);

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await uploadNode(id,name,dateOfBirth,dateOfDeath,placeOfBirth);
      console.log(response.data);
      setMessageSnackbar(response.data.message);
      setColor(green[500]);
      setOpen(true);
    }catch(error){
      console.log(error);
    }
    finally{
      updateNodes();
    }
};
  return (
    <>
    <div> This is a {" "}<span style={{ color: "#3d5afe", fontWeight:"bolder"}}>FormEdit</span> {" "}from a component</div>
    <Divider />
    <h1>
        current Node ID: {" "}
        <span style={{ color: "#3d5afe", fontWeight:"bolder"}}>{id}</span> 
    </h1>

    <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 1 }}>
    <div>
        <UploadFile id={id} updateNodes={updateNodes} updateNodesConyuge={updateNodesConyuge}/>        
    </div>
    <Box sx={{display:'flex', flexDirection:"column", mt:1, gap: 1}}>
    <TextField
          required
          variant="outlined"
          label="Nombre completo"
          placeholder="Nombre(s) Apellido Paterno Apellido Materno"
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DriveFileRenameOutlineIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
           <TextField
          required
          variant="outlined"
          label="Fecha de nacimiento"
          type="date"
          placeholder="dd/mm/aaaa"
          value={dateOfBirth}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e:ChangeEvent<HTMLInputElement>) =>setDateOfBirth(e.target.value)}
        />

<TextField
          required
          variant="outlined"
          label="Fecha de defunción"
          type="date"
          placeholder="dd/mm/aaaa"
          value={dateOfDeath}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e:ChangeEvent<HTMLInputElement>) =>setDateOfDeath(e.target.value)}
        />
            <TextField
            required
            variant="outlined"
            label="Lugar de nacimiento"
            placeholder="Municipio, Estado"
            value={placeOfBirth}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FmdGoodIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e:ChangeEvent<HTMLInputElement>) =>setPlaceOfBirth(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{mt:1}}
            onClick={handleFormSubmit}
          >
            Guardar
          </Button>

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
    </Box>
    </Box>
    </>
    
  )
}

export default FormEdit