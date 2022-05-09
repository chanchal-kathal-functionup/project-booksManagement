const express = require('express');
const router = express.Router();

// const booksController = require("../controllers/booksController")
const userController = require("../controllers/userController")
const loginController =require("../controllers/loginController")
//const middleWare = require ("../middlewares/middleWare")

router.post("/register",userController.createUser)
router.post("/login", loginController.login)


module.exports = router;