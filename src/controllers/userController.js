const userModel=require("../models/userModel");
const validator=require("validator")

const isValid= function(value){
    if(typeof value==="undefined"||typeof value===null)return false
    if(typeof value==="String"&& typeof value.trim().length===0)return false
    return true;
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
 const createUser = async function(req,res){
     try{
     const requestBody = req.body
     const {title,name,phone,email,password,address}= requestBody

    if(!isValidRequestBody(requestBody)){
      return res.status(400).send({status:false, message:"invalid request parameter please provide user details"})
    }
    if(!isValid(title)){
    return res.status(400).send({status:false,message:"Title is required"})
    }
    if(!isValid(name)){
      return res.status(400).send({status:false, message:"Name of user is required"})
   }
   if(!isValid(phone))
    return res.status(400).send({status:false, message:"Phone No. of user is required"})
   
    const validatePhone = function (phoneString){

        reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return reg.test(phoneString);
     }
     if(!validatePhone(phone))
     return res.status(400).send({status:false,message:"Please enter valid phone no."})

     const duplicatePhone= await userModel.findOne({phone:phone})
     if(duplicatePhone){
         return res.status(409).send({status:false,message:"This phone no.is already register,please use different phone no."})
     }


   if(!isValid(email)){
    return res.status(400).send({status:false, message:"email of user is required"})
   
   }
   const validEmail = validator.isEmail(email);
   if (validEmail === false)
     return res.status(400).send({ status: false, message: "Please enter valid email" })

   const duplicateEmail = await userModel.findOne({email:email})
   if(duplicateEmail)
     return res.status(409).send({ status: false, message: "User with this email already registered." })

   if(!isValid(password)){
    return res.status(400).send({status:false, message:"Password is required"})
   }
   if(!isValid(address)){
    return res.status(400).send({status:false, message:"Address is required"})
   
   }

const createdUser = await userModel.create(requestBody);
return res.status(201).send({ status: true, data: createdUser });

     }
     catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
 }
 module.exports.createUser=createUser;