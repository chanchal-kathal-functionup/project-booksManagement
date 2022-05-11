const jwt = require("jsonwebtoken");
const booksModel = require("../models/booksModel");
// const booksModel = require("../models/booksModel");

const user= async function(req, res, next){
try{
let token = req.headers["x-api-key"];
  if (!token) {
    token = req.headers["x-Api-key"];
  }
  if (!token) {
      //404- not found
    return res.status(404).send({ status: false, message: "token must be present" });
  }

  let decodedtoken = jwt.verify(token, "Group46");
  if (!decodedtoken){
      //400- bad request
    return res.status(400).send({ status: false, message: "token is invalid" });
  }
  next();
}
catch (err) {
   return res.status(500).send({ msg: "Error", message: err.message })
  };
}

const auth= async function(req,res,next){
  try{
    let bookId=req.params.bookId
    let user=req.body.userId
    const token = req.headers["x-api-key"];
    decodedtoken=jwt.verify(token,"Group46")
 
    const book = await booksModel.findById(bookId)
    if(!book){
      return res.status(400).send({status:false,message:"This bookId is not exist"})
    }
    if(decodedtoken.userId!=book.userId){
      return res.status(400).send({status:false,message:"You are not authorized"})
    }
    next();
  }
  catch(error){
    return res.status(500).send({status:false,message:error.message})
  }

}

module.exports.user = user;
module.exports.auth=auth;