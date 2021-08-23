const Product=require('../models/product');

module.exports={
    getAllProducts:async(req,res,next)=>{
        try{
            const products=await Product.find({},{name:1,price:1,productImage:1});
            if(products){
                const response={
                    count:products.length,
                    products:products.map(product=>{
                        return{
                            name:product.name,
                            price:product.price,
                            productImage:product.productImage,
                            request:{
                                type:'GET',
                                url:'http://localhost:3000/products/'+product._id
                            }
                        }
                    })
                }
                return res.status(200).json({
                    message:"Products found",
                    products:response
                });
            }else{
                return res.status(500).json({
                    message:"No product Found"
                })
            }
        }catch(err){
            return next(err)
        }
    },
    createProduct:async(req,res,next)=>{
        try{
            console.log(req.file);
            console.log(req.file.path)
            const{name,price}=req.body;
            const product=new Product({
                name:name,
                price:price,
                productImage:req.file.path
            });
            const data=await product.save();
            if(data){
                res.status(201).json({
                    message:"Product created successfully",
                    createdProduct:{
                        _id:data._id,
                        name:data.name,
                        price:data.price,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/products/'+data._id
                        }
                    }
                })
            }else{
                res.status(500).json({
                    message:"Product didn't save to the database"
                })
            }
        }catch(err){
            return next(err);
        }
    },
    getProductById:async(req,res,next)=>{
        try{
            const id=req.params.productId;
            const product=await Product.findById(id,{name:1,price:1,productImage:1});
            if(product){
                res.status(200).json({
                    message:"Product found",
                    product:product,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products'
                    }
                })
            }else{
                res.status(500).json({
                    message:"Product Doesn't exist"
                })
            }
        }catch(err){
            return next(err);
        }
        
       
    },
    updateProductById:async(req,res,next)=>{
        try{
            const id=req.params.productId;
            updateProduct={}
            for(let key in req.body){
                updateProduct[key]=req.body[key];
            }
            const {name,price}=req.body;
            console.log(req.body);
            console.log(updateProduct);
            const data=await Product.findByIdAndUpdate(id,updateProduct,{new:true});
            if(data){
                res.status(200).json({
                    message:"Product update Successfully",
                    request:{
                        type:'GET',
                        url:'http://localhost/3000/products/'+id
                    }
                })
            }else{
                res.status(500).json({
                    message:"unable to update the Product",
                })
            }
        }catch(err){
            return next(err);
        }
    },
    deleteProductById:async(req,res,next)=>{
        try{
            const id=req.params.productId;
            const data=await Product.findByIdAndRemove(id);
            if(data){
                res.status(200).json({
                    message:"Product deleted Successfully",
                    request:{
                        type:'POST',
                        url:'http://localhost:3000/products',
                        body:{name:'String',price:'Number'}
                    }
                });
            }else{
                res.status(500).json({
                    message:"Unable to delete the product"
                })
            }
        }catch(err){
            return next(err);
        } 
    }
}