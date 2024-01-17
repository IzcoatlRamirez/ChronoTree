import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { 
    nodesUser, 
    aristasConyuge, 
    nodesConyuge, 
    createConyuge, 
    createChild, 
    aristasUser, 
    nodeConyuge,
    deleteConyuge,
    deleteNode,
    haveNodeDependencies,
    uploadNode,    
    uploadNodeConyuge,
    uploadImageNode,
    uploadImageNodeConyuge
} from "../controllers/nodes.controller";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/nodes', authRequired, nodesUser);

router.get('/aristasConyuge', authRequired, aristasConyuge)

router.get('/nodesConyuge', authRequired, nodesConyuge);

router.get('/aristas', authRequired, aristasUser)

router.post('/haveConyuge', authRequired, nodeConyuge);

router.post('/conyuge', authRequired, createConyuge);

router.post('/child', authRequired, createChild);

router.post('/haveNodeDependencies', authRequired, haveNodeDependencies);

router.delete('/conyuge',authRequired,deleteConyuge);

router.delete('/child',authRequired,deleteNode);

router.put('/node',authRequired,uploadNode);

router.put('/nodeConyuge',authRequired,uploadNodeConyuge);

router.put('/nodeImage',authRequired,upload.single('imageUrl'),uploadImageNode);

router.put('/nodeImageC',authRequired,upload.single('imageUrl'),uploadImageNodeConyuge);

export default router;
