import {Router} from 'express';
import { printinfo, getPgUsers, pgCreateUser, pgUpdateUser } from '../controllers/logic.controller';
import { getUsers } from '../database/inmemory';
import { validateUser } from '../utils/user.validation';
const router = Router();

router.get('/info', printinfo);
router.get('/data', getUsers);
router.get('/users', getPgUsers);
router.post('/users', validateUser, pgCreateUser);
router.put('/users/:id', validateUser, pgUpdateUser);

export default router;