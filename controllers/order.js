const Order=require('../models/order');
const Product=require('../models/product');

module.exports={
 getAllOrder:async(req,res)=>{
    try{
        const orders=await Order.find({},{quantity:1,product:1}).populate('product','name');
        if(orders){
            res.status(200).json({
                count:orders.length,
                orders:orders.map(order=>{
                    return{
                        _id:order._id,
                        product:order.product,
                        quantity:order.quantity,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/orders/'+order._id
                        }
                    }
                }),
                
            })
        }else{
            res.status(500).json({
                message:"Unable to get an orders"
            })
        }
    }catch(err){
        return next(err);
    }
 },
 createOrder:async(req,res,next)=>{
    try{
        const product=await Product.findById(req.body.product);
        if(product){
            const order=new Order(req.body);
            const data=await order.save();
            if(data){
                res.status(201).json({
                    message:"Created order successfully",
                    createdOrder:{
                        _id:data._id,
                        product:data.product,
                        quantity:data.quantity
                    },
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+data._id
                    }
                })
            }else{
                res.status(500).json({
                    message:'Unable to create the order'
                })
            }
        }else{
            res.status(500).json({
                message:'Product doesnt exist that you are ordering'
            })
        }
    }catch(err){
        return next(err);
    }
 },
 getOrderById:async(req,res,next)=>{
    try{
        const id=req.params.orderId;
        const order=await Order.findById(id).populate('product');
        if(order){
            res.status(200).json({
                order:order,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/orders/'
                }
            })
        }else{
            res.status(404).json({
                message:"Order doesn't exist"
            })
        }
    }catch(err){
        return next(err);
    }
 },
 deleteOrderById:async(req,res,next)=>{
    try{
        const id=req.params.orderId;
        const data=await Order.findByIdAndRemove(id);
        if(data){
            res.status(200).json({
                message:"Order deleted",
                request:{
                    type:'POST',
                    url:'https://localhost:3000/orders',
                    body:{productId:'ID',quantity:'Number'}
                }
            })
        }else{
            res.status(500).json({
                message:"Unable to delete user"
            })
        }
    }catch(err){
        return next(err);
    } 
 }
}