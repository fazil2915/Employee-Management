import bcrypt from 'bcrypt';
import {generateTokens} from  '../middleware/auth.js'
import User from '../models/user.js'

export const register=async(req,res)=>{
    try {
        const{
         userName,
         password
        }=req.body;
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            userName,
            password:hashedPassword
        })
        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({err:error.message});
    }
}


export const login=async (req,res)=>{
    try {
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        if(!user){
            return res.status(400).json({msg:'User not found'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(400).json({msg:'Invalid credentials'});

        const token=generateTokens(user);
        delete user.password;
        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({err:error.message}); 
    }
}