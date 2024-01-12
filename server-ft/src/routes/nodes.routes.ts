import { Router } from "express";
import { nodesUser, aristasConyuge, nodesConyuge, createConyuge, createChild, aristasUser, nodeConyuge,deleteConyuge,deleteNode,haveNodeDependencies } from "../controllers/nodes.controller";
import { authRequired } from "../middlewares/validateToken";


const router = Router();

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


export default router;
