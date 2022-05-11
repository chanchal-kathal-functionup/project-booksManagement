const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

// validation function 


const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}



//second api to looged in User 

const login = async function(req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
           return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide login details' })
            
        }
        if (requestBody.email && requestBody.password) {
            const check = await userModel.findOne({ email: requestBody.email, password: requestBody.password });
            if (!check) {
                return res.status(400).send({ status: false, msg: "Invalid login credentials" })
            }

            let payload = { _id: check._id }
            let token = jwt.sign(payload, "Group46")
            res.header('x-api-key', token);
            res.status(200).send({ status: true, data: "User login successfull", token:  token  })
        } else {
            res.status(400).send({ status: false, msg: "must contain email and password" })
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}




module.exports.login = login;