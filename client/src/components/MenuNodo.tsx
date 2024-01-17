import React, {useEffect} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { amber,red,teal} from '@mui/material/colors';
import {Dialog,DialogContent} from "@mui/material";
import { createConyuge,createChild,haveConyuge,haveNodeDependencies,deleteChild} from '../services/NodesService';
import { NodeRoot } from '../interfaces/Nodes';
import FormEdit from './FormEdit';


function MenuNodo({id,updateNodes,updateNodesConyuge}:NodeRoot) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [conyuge, setConyuge] = React.useState(false);
    const [nodeDependencie, setNodeDependencie] = React.useState(false);
    const open = Boolean(anchorEl);

    const submitCreateConyuge = async () => {
      try{
        await createConyuge(id);
        updateNodesConyuge();
      }catch(error){
        console.log(error)
      }
    }

    const submitCreateChild = async () => {
      try{
        await createChild(id)
        updateNodes()
      }catch(error){
        console.log(error)
      }
    }

    const submitDeleteNode = async () => {
      try{
        await deleteChild(id)
        updateNodes()
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      const canCreateConyuge = async () => {
        try{
          const conyuge = await haveConyuge(id)
          setConyuge(conyuge.data)
        }catch(error){
          console.log(error)
        }
      }

      canCreateConyuge()
    }, [submitCreateConyuge])

    useEffect(() => {
      const canEliminate = async () => {
        try{
          const nodeDependencie = await haveNodeDependencies(id)
          setNodeDependencie(nodeDependencie.data)
        }catch(error){
          console.log(error)
        }
      }
      canEliminate()
    }, [submitCreateChild])

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
          <MenuItem onClick={async ()=>{
            handleClose()
            await submitCreateChild()
          }}>
          <ListItemIcon>
            <AddIcon sx={{color:teal['A400']}} fontSize="small" />
          </ListItemIcon>
            Agregar hijo
            </MenuItem>

          <MenuItem onClick={async ()=>{
            handleClose()
            await submitCreateConyuge()
          }} disabled={conyuge}>
          <ListItemIcon>
            <AddIcon sx={{color:teal['A400']}} fontSize="small" />
          </ListItemIcon>
            Agregar conyuge
            </MenuItem>

          <MenuItem onClick={()=>{
            handleClose()
            handleOpenEdit()
          }}>
          <ListItemIcon>
            <EditIcon sx={{ color:amber['A400']}} fontSize="small" />
          </ListItemIcon>Editar</MenuItem>

          <MenuItem   onClick={async()=>{
            handleClose()
            await submitDeleteNode()
          
          }} disabled={id===1 || nodeDependencie}>
          <ListItemIcon>
            <DeleteForeverIcon sx={{ color:red['A400']}} fontSize="small" />
          </ListItemIcon>Eliminar</MenuItem>
        </Menu>

        <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogContent>
          <FormEdit id={id} updateNodes={updateNodes} updateNodesConyuge={updateNodesConyuge}/>
        </DialogContent>
      </Dialog>
      </div>
)}

export default MenuNodo