import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Person4Icon from '@mui/icons-material/Person4';
import Cookies from 'js-cookie';
import {blue} from '@mui/material/colors';
import { Typography } from '@mui/material';

type Anchor = 'left'  ;

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [nameUser,setNameUser] = React.useState('');

  const logout = async () => {
      Cookies.remove('token');     
      Cookies.remove('name');
      window.location.href = '/';
  }

  React.useEffect(() => {
    const getName = async () => {
      try{
        const name = Cookies.get('name')
        if(name) setNameUser(name)
      }catch(error){
        console.log(error)
      }
    }
    getName()
  },[]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{width:250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
          <ListItem  disablePadding>
              <ListItemIcon sx={{ml:1}}>
                <Person4Icon sx={{color:blue['A700'],fontSize:40}}/>
              </ListItemIcon>
              <Typography>Bienvenido! {" "} 
              <span style={{ color: "#3d5afe", fontWeight:"bolder"}}>{nameUser}</span> 
              </Typography>
          </ListItem>
      </List>
      <Divider sx={{mb:73}} />
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon sx={{color:blue['A700']}}/>
              </ListItemIcon>
              <Typography>Cerrar sesion</Typography>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsSuggestIcon sx={{color:blue['A700']}}/>
              </ListItemIcon>
              <ListItemText primary={'Mi Cuenta'} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <ViewSidebarIcon/>
            </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
