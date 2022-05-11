const express = require("express");
const booksModel =require("../models/booksModel");
//const validator=require("validator");
const userModel = require("../models/userModel");

const isValid= function(value){
    if(typeof value==="undefined"||typeof value===null)return false
    if(typeof value==="String"&& typeof value.trim().length===0)return false
    return true;
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createBook= async function(req,res){
    try{
        let requestBody=req.body
         const{title,excerpt,userId,ISBN,category,subcategory,reviews}=requestBody

         if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status:false, message:"invalid request parameter please provide user details"})
          }

         if(!title)
         return res.status(400).send({status:false,message:"title of Book is required"})
         
         const duplicatetitle=await booksModel.findOne({title:title})
         if(duplicatetitle)
         return res.status(400).send({status:false,message:"This book title is already exist"})

         if(!isValid(excerpt))
         return res.status(400).send({status:false,message:"excerpt is required"})

         if(!isValid(userId))
         return res.status(400).send({status:false,message:"userId is required"})

         const validate = await userModel.findById({_id:userId})
         if(!validate)
         return res.status(400).send({status:false,message:"UserId is not valid"})

         if(!isValid(ISBN))
         return res.status(400).send({status:false,message:"ISBN is required"})

         const duplicateISBN=await booksModel.findOne({ISBN:ISBN})
         if(duplicateISBN)
         return res.status(400).send({status:false,message:"ISBN is already exist"})


         if(!isValid(category))
         return res.status(400).send({status:false,message:"category is required"})

         if(!isValid(subcategory))
         return res.status(400).send({status:false,message:"subcategory is required"})

         if(!isValid(reviews))
         return res.status(400).send({status:false,message:"reviews is required"})

        //  if(req.user!==userId){
        //  return res.status(400).send({status:false,messege:"you are unauthorised"})
        //  }
       const createdBook = await booksModel.create(requestBody)
        return res.status(400).send({status:true,message:"Book created Successfully", data:createdBook})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const getBooks=async function(req,res){
    try{
         let data = req.query
        const book= await booksModel.find(data,{isDeleted:false}).select({_id:1, title:1, excerpt:1, userId:1, category:1, releasedAt:1, reviews:1}).sort({"title":1});
        if(book.length ===0){
            return res.status(400).send({status:false,message:"no data found"})
             }
             return res.status(200).send({status:true,message:"Success",data:book})
    //       const getData = await booksModel.find({ isDeleted:false, $or:[ {userId:req.query.userId},{category:req.query.category},{subcategory:req.query.sucategory}]})
    //       return res.status(200).send({status:true,message:"Success",data:getData})
        
     }
    catch(err){
        return res.status(500).send({status:false,message:err.messege})
    }
}


    const getBookById = async function(req,res){
        try{
            let _id =req.params.bookId
            const checkBooks= await booksModel.findOne({_id},{isDeleted:false})
            if(!checkBooks){
            return res.status(400).send({status:false,message:"This bookId not exist"})
            }else{
                return res.status(200).send({status:true,data:checkBooks})
            }
        }
        catch(err){
            return res.status(500).send({status:false,message:err.messege})
        }
    }


    const updateBooks= async function (req,res){
        try{
             let data = req.body;
             let id=req.params.bookId
             
               if(!isValidRequestBody(data)){
                   return res.status(400).send({status:false,message:"Invalid request parameter,please provide parameter to update"})
               }

            const checkBookId= await booksModel.findById(id)
            if(!checkBookId){
                return res.status(400).send({status:false,message:"This book Id is not exist"})
            }
            /*....................duplication......................*/
            
         const duplicateISBN=await booksModel.findOne({ISBN:data.ISBN})
         if(duplicateISBN){
         return res.status(409).send({status:false,message:"this ISBN is already exist please use different ISBN "})
         }
         const duplicatetitle = await booksModel.findOne({title:data.title})
         if(duplicatetitle){
         return res.status(409).send({status:false,message:"This book title is already exist please use different title"})
         }

         if(checkBookId.isDeleted==true){
             return res.status(400).send({status:false,message:"this book is already deleted"})
         }
         const updatedBooks= await booksModel.findOneAndUpdate({_id:id},{$set:{title:data.title, excerpt:data.excerpt, releasedAt:data.releasedAt, ISBN:data.ISBN}},{new:true})
          return res.status(201).send({status:true,message:"Success",data:updatedBooks})
       
        }
        catch(error){
            return res.status(500).send({status:false,messege:error.messege})
        }
    }

    const deleteBookByid = async function(req, res) {
        try {
    
            // authroization for check the user is authrorized to delete blog or not only user can delete his own book
    
            const data = await booksModel.findOne({ _id: req.params.bookId, isDeleted: false });
            if (!data) {
                res.status(404).send({ status: false, message: "book does not exist or already deleted" });
            }

    
            let deleteBook = await booksModel.findOneAndUpdate({ _id: req.params.bookId }, { isDeleted: true, deletedAt: new Date() }, { new: true });
            res.status(200).send({ status: true, message: "sucessfully deleted", data: deleteBook });
    
        } catch (error) {
    
            res.status(500).send({ status: false, message: error.message });
        }
    }
    
module.exports.createBook=createBook;
module.exports.getBooks=getBooks;
module.exports.getBookById=getBookById;
module.exports.deleteBookByid=deleteBookByid;
module.exports.updateBooks=updateBooks;