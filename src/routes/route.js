const express = require('express');
const router = express.Router();

 const booksController = require("../controllers/booksController")
  const userController = require("../controllers/userController")
 const loginController = require("../controllers/loginController")
const reviewController = require("../controllers/reviewController")
      const middleWare = require("../middlewares/middleWare")

router.post("/register",userController.createUser)

router.post("/login", loginController.login)

router.post("/books", middleWare.user,booksController.createBook)

router.get("/getbooks", middleWare.user, booksController.getBooks)

router.get("/getbook/:bookId",middleWare.user, booksController.getBookById)

router.put("/updatebooks/:bookId",middleWare.user,booksController.updateBooks)

router.delete("/deletebook/:bookId",middleWare.user, booksController.deleteBookByid)



module.exports = router;