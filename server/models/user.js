import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   
    userName:{
        type:String,
        required: true,
        max:50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min:5
    }
})
   
const User=mongoose.model('User',userSchema)
export default User