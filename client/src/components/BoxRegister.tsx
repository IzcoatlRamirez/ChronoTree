import { useState, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { registerUser } from "../services/UserService";
import MuiAlert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";

function BoxRegister() {
  const orange = "#ff5722";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [messageSnackBar, setMessageSnackbar] = useState<String>("");
  const [color, setColor] = useState<string>("");

  const navigate = useNavigate();

  const goToMain = () => {
    setTimeout(function () {
      navigate("/main");
    }, 1500);
  };
  const handleClick = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setMessageSnackbar("Por favor, complete todos los campos.");
      setColor(orange);
      setOpen(true);
      return;
    }
    try {
      const res = await registerUser(username, password);
      if (res.data.code === 400) {
        setColor(orange);
        setMessageSnackbar(res.data.message);
        setOpen(true);
        return;
      }
      setMessageSnackbar(res.data.message);
      setColor(green["A700"]);
      setOpen(true);
      goToMain();
    } catch (error) {
      console.log(error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Paper sx={{ padding: 10 }}>
      <FormControl
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <AccountCircleIcon sx={{ fontSize: 38 }} />
          <Typography sx={{ fontSize: "38px", fontWeight: "bolder" }}>
            Crear su cuenta
          </Typography>
        </Box>
        <TextField
          required
          variant="filled"
          label="Nombre de usuario"
          value={username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DriveFileRenameOutlineIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          variant="filled"
          label="Contraseña"
          type="password"
          value={password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{
            bgcolor: "#651fff",
            color: "white",
            "&:hover": { bgcolor: "#4615b2", color: "white" },
          }}
          onClick={handleClick}
        >
          Guardar
        </Button>
      </FormControl>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          sx={{ backgroundColor: color }}
        >
          {messageSnackBar}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
}

export default BoxRegister;
