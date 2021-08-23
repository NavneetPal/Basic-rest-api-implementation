const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const {getAllOrder,createOrder,getOrderById,deleteOrderById}=require('../controllers/order');

router.get('/',checkAuth,getAllOrder)
router.post('/',checkAuth,createOrder)
router.get('/:orderId',checkAuth,getOrderById);
router.delete('/:orderId',checkAuth,deleteOrderById);

module.exports=router;