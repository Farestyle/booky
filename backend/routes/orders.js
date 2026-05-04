import express from 'express';
import { checkout } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, checkout);

export default router;
