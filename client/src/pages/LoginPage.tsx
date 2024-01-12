import TopBarWelcome from "../components/TopBarWelcome"
import {Box} from '@mui/material'
import BoxLogin from '../components/BoxLogin.tsx'

function LoginPage() {
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
    <TopBarWelcome/>
    <div style={{ marginTop: 100, display:'flex',alignItems:'center',justifyContent:'center'}}>     
    <BoxLogin/>
    </div>
</Box>
  )
}

export default LoginPage
