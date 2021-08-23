require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order')
const userRoutes=require('./routes/user');


//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(morgan('common'));


//cors error handling
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})


//Db Connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>console.log("Database connected Properly"))
.catch(err=>{
    console.log("Database not connected properly");
})



  


//Routes
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);


//Error handling
app.use((req,res,next)=>{
    const error=new Error('Invalid Request');
    error.status=404;
    next(error);
})

app.use((err,req,res,next)=>{
    const statusCode=err.status||500;
    return res.status(statusCode).json({
        error:err.message
    })
})

const port=3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})