import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import { Button,Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

function TopBarWelcome() {

  const navigate = useNavigate()

  function goToRegister(){
    navigate("/register")
  }

  function goToLogin(){
    navigate("/login")
  }

  return (
    <AppBar sx={{position:'fixed',top:0,left:0, backgroundColor:'white'}}>
    <Toolbar sx={{display:'flex',flexDirection:'row',gap:90}}>
      <Box sx={{marginLeft:'12.5%'}}><Logo></Logo></Box>
      <div>
        <Button sx={{color:grey['700']}} onClick={goToLogin}>Inicie Sesion</Button>
        <Button sx={{bgcolor:'#651fff',color:'white','&:hover': {bgcolor: '#4615b2',color: 'white'}}} onClick={goToRegister}>Registrese</Button>
      </div>
    </Toolbar>
  </AppBar>
)

}

export default TopBarWelcome