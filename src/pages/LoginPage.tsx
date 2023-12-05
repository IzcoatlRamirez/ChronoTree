import TopBarWelcome from "../components/TopBarWelcome"
import {Box} from '@mui/material'

function LoginPage() {
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
    <TopBarWelcome/>
    <div style={{ marginTop: 100, display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div>usuarios registrados</div>
    </div>
</Box>
  )
}

export default LoginPage