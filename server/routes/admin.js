import express from 'express';
import {register,login} from '../controllers/user.js'
import { authenticateToken } from '../middleware/auth.js';
import { deleteEmployee, getEmployees,getSingleEmployee } from '../controllers/employee.js';


const router=express.Router();


router.post('/register',register)
router.post('/login',login)
router.get('/getEmployees',authenticateToken,getEmployees)
router.get('/getSingleEmployee/:id',authenticateToken,getSingleEmployee)
router.delete('/deleteEmployee/:id',authenticateToken,deleteEmployee)


export default router;
