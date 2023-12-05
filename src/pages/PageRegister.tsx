import TopBarWelcome from "../components/TopBarWelcome"
import BoxRegister from "../components/BoxRegister"
import {Box} from '@mui/material'

function PageRegister() {
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
        <TopBarWelcome/>
        <div style={{ marginTop: 100, display:'flex',alignItems:'center',justifyContent:'center'}}>
            <BoxRegister/>
        </div>
    </Box>
  )
}

export default PageRegister