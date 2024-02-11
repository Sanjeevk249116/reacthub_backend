const mongoose=require("mongoose");
const SignUpSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    dob:{type:String,required:true},
    phone:{type:String,required:true},
})

const SignUpModel=mongoose.model("sign",SignUpSchema);
module.exports={SignUpModel}