import express from 'express';
import { addToCart, getCartData } from '../controller/cartController.js';
import { jwtMiddleware } from '../middleware/jwtmiddleware.js';


const router=express.Router();

router.post('/add',addToCart);
// router.post('/:userId', jwtMiddleware,getCartData);
router.post('/', jwtMiddleware,getCartData);
export default router;