import {Router} from 'express';
import { printinfo, getPgUsers, pgCreateUser, pgUpdateUser, pgDeleteUser, pgGetUserById } from '../controllers/logic.controller';
import { getUsers } from '../database/inmemory';
import { validateUser } from '../utils/user.validation';
import { validateId } from '../utils/validateId';
const router = Router();

// test
router.get('/info', printinfo);
// array database 
router.get('/data', getUsers);
// postgres database
router.get('/users', getPgUsers);
router.get("/users/:id", validateId, pgGetUserById);
router.post('/users', validateUser, pgCreateUser);
router.put('/users/:id', validateUser, pgUpdateUser);
router.delete("/users/:id", validateId, pgDeleteUser);


export default router;