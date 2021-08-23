const express=require('express');
const router=express.Router();
const User=require('../models/user');
const checkAuth=require('../middleware/check-auth');

const {signup,signin,deleteUser}=require('../controllers/user');

router.post('/signup',signup)
router.post('/signin',signin)
router.delete('/:userId',checkAuth,deleteUser)

module.exports=router;