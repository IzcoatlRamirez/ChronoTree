import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar} from '@mui/material';
import { pink } from '@mui/material/colors';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MenuNodoConyuge from './MenuNodoConyuge';
import { Node } from '../interfaces/Nodes';

//foto , nombre , fecha de nacimiento , lugar de nacimiento 

function NodoConyuge({id,imageUrl,nombre,fechaNacimiento,lugarNacimiento,fechaDefuncion,X,Y,updateNodesConyuge,updateNodes}:Node) {
  return (
    <Card sx={{ maxWidth: 210, minWidth:210, maxHeight:320,minHeight:320,p:1, position:'absolute', left:X,top:Y, display:'inline-block'}}>

        <div style={{marginBottom:25}}>
            <Avatar sx={{width:125,height:125,margin:'auto'}} src={imageUrl}></Avatar>
        </div>
        <div style={{marginBottom:25,textAlign:'center',borderBottom: '2px dashed black'}}>
            <Typography sx={{fontWeight:'bold'}}>{nombre}</Typography>
        </div>
        <div style={{marginBottom:7,display:'flex',flexDirection:'row'}}>
        <DateRangeIcon sx={{color:"#646cff"}}fontSize='medium'></DateRangeIcon>
        <Typography sx={{fontSize:14}}
        >{fechaNacimiento}</Typography>{fechaDefuncion ? <Typography sx={{fontSize:14}}>/{fechaDefuncion}</Typography> : null}
        </div>
        <div style={{display:'flex', flexDirection:'row',marginBottom:15}}>
        <FmdGoodIcon sx={{ color: pink[500] }}  fontSize='medium'></FmdGoodIcon>
       <Typography>{lugarNacimiento}</Typography>
        </div>
        <MenuNodoConyuge id={id} updateNodes={updateNodes} updateNodesConyuge={updateNodesConyuge}/>
    </Card>
  )
}

export default NodoConyuge