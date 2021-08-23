const express=require('express');
const router=express.Router();
const multer=require('multer');
const checkAuth=require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
        //accept
        cb(null,true);
    }else{
        //reject
        cb(null,false);
    }
}

const upload=multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

const {getAllProducts,createProduct,getProductById,updateProductById,deleteProductById}=require('../controllers/product');


router.get('/',getAllProducts)
router.post('/',upload.single('productImage'),createProduct)
router.get('/:productId',getProductById);
router.patch('/:productId',/* checkAuth, */updateProductById);
router.delete('/:productId',checkAuth,deleteProductById);

module.exports=router;