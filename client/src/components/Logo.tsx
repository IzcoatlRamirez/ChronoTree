import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { Typography,Box,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate()

  function goToWelcome(){
    navigate('/')
  }

  return (
    <Box sx={{display:'flex',flexDirection:'row',gap:'2'}}>
      <Button onClick={goToWelcome}>
      <FamilyRestroomIcon sx={{ color: "#3d5afe", fontSize:48}} />
      <Typography component="h1" variant="h5" sx={{color:'#3d5afe',fontWeight:'bolder',mt:'5%'}}>
        ChronoTree
      </Typography>
      </Button>
    </Box>
  );
}

export default Logo;
