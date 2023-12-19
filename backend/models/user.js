import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    profilePic: { type: String, defaut: "" },
    token:{type:String},
    
},{timestamps:true}
)

export const User= mongoose.model("user", userSchema);