import {Router} from 'express';
import { printinfo } from '../controllers/logic.controller';
const router = Router();

router.get('/info', printinfo);

export default router;