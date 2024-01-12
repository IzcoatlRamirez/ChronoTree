import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { amber,red} from '@mui/material/colors';
import {Dialog,DialogContent} from "@mui/material";
import { deleteConyuge} from '../services/NodesService';
import { NodeRoot } from '../interfaces/Nodes';


function MenuNodoConyuge({id,updateNodesConyuge}:NodeRoot) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleOpenEdit = async () => {
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const submiteDeleteConyuge = async () => {
      try{
        await deleteConyuge(id)
        updateNodesConyuge()  
      }catch(error){
        console.log(error)
      }
    }

    return (
      <div style={{marginLeft:150}}>
        <Button
          id="basic-button"
          color='warning'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          ...
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
          <ListItemIcon onClick={handleOpenEdit}>
            <EditIcon sx={{ color:amber['A400']}} fontSize="small" />
          </ListItemIcon>Editar</MenuItem>

          <MenuItem   onClick={()=>{
            handleClose()
            submiteDeleteConyuge()
          }}>
          <ListItemIcon>
            <DeleteForeverIcon sx={{ color:red['A400']}} fontSize="small" />
          </ListItemIcon>Eliminar</MenuItem>
        </Menu>

        <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogContent>
          <h1>Este es un formedit</h1>
        </DialogContent>
      </Dialog>
      </div>
)}

export default MenuNodoConyuge