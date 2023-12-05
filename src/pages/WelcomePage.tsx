import TopBarWelcome from "../components/TopBarWelcome";
import { Box, Button, Grid, Typography } from "@mui/material";;
import { grey } from "@mui/material/colors";
import muestra from "../assets/muestra.png";

function WelcomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TopBarWelcome />
      <div style={{ marginTop: 100}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ ml: "10%", mt: "10%" }}>
              <Typography
                sx={{ fontSize: "38px", fontWeight: "bolder", margin: 0 }}
              >
                Crea tu{" "}
                <span style={{ color: "#3d5afe" }}>árbol genealógico</span> de
                manera rápida y sencilla.
              </Typography>

              <Typography sx={{ fontSize: 28, color: grey["A700"] }}>
                Agrega fotos, historias y construye tu colección propia de
                historia familiar.
              </Typography>

              <Button sx={{bgcolor:'#3d5afe',color:'white',mt:5,'&:hover': {bgcolor: '#637bfe',color: 'white'}}}>Comenzar</Button>
            </Box>
          </Grid>

          <Grid item xs={6} style={{ height: "650px", backgroundColor: "#242424" }}>
            <img
              src={muestra}
              alt="Muestra"
              style={{ maxWidth: "100%", width: "100%" }}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default WelcomePage;
