const middleware=require('../middleware/auth.js')
const User=require('../models/user.model.js')
import bcrypt, { hash } from 'bcrypt'

exports.register=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10)

        const user=new User({
            username,password: hashedPassword,email
        })
        await user.save();

        res.status(201).json({message:'User registered successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username})

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const token=jwt.sign({_id:user._id,username: user.username},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}