import {Router} from 'express';
import { printinfo } from '../controllers/logic.controller';
import { getUsers } from '../database/inmemory';
const router = Router();

router.get('/info', printinfo);
router.get('/data', getUsers)

export default router;