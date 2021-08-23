const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports={
    signup:async(req,res,next)=>{
        try{
            const {email,password}=req.body;
            const userExist=await User.findOne({email:email});
            if(userExist){
                console.log(userExist);
                res.status(409).json({
                    message:"User with email already registered"
                })
            }else{
                const user=new User({
                    email:email,
                    password:bcrypt.hashSync(password,10)
                })
                const data=await user.save( );
                if(data){
                    console.log(data);
                    res.status(201).json({
                        message:'User created'
                    })
                }else{
                    res.status(500).json({
                        message:'Unable to save the user'
                    })
                }
            }
        }catch(err){
            return next(err);
        }
    },
    signin:async(req,res,next)=>{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(user){
            if(bcrypt.compareSync(password,user.password)){
                const token=jwt.sign({
                    email:user.email,
                    userId:user._id
                },process.env.JWT_KEY,{
                    algorithm:'HS256',
                    expiresIn:'1 days',
                    notBefore:10,
                });
                res.status(200).json({
                    message:'Auth Successfull',
                    token:token
                })
            }else{
                res.status(401).json({
                    message:"Auth Failed"
                })
            }
        }else{
            res.status(401).json({
                message:"Auth Failed"
            })
        }
    },
    deleteUser:async(req,res,next)=>{
        try{
            const id=req.params.userId;
            const data=await User.findByIdAndRemove(id);
            if(data){
                res.status(200).json({
                    message:'user deleted'
                })
            }
        }catch(err){
            return next(err);
        }
    }
}