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

router.get("/books", middleWare.user, booksController.getBooks)

router.get("/books/:bookId",middleWare.user, booksController.getBooksById)

router.put("/books/:bookId",middleWare.user,booksController.updateBooks)

router.delete("/books/:bookId",middleWare.user, booksController.deleteBookByid)

router.post("/books/:bookId/review",reviewController.createReview)

router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReviewById)

router.put("/books/:bookId/review/:reviewId",reviewController.updateBookReview)



module.exports = router;