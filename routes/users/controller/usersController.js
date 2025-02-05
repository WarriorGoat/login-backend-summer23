const User = require('../model/User')
const {createUser, hashPassword} = require("./usersHelper")

module.exports={
    login: async (req, res) => {
        try {
          console.log(req.body);
            if (req.body.username !== 'Brad' && req.body.username !== 'Janet' ){
                throw {
                    status: 404,
                    message: "User Not Found"
                }
            }

            if (req.body.password !== 'abc'){
                throw {
                    status: 403,
                    message: "Invalid Password"
                }
            }
            res.status(200).json({
                username: req.body.username,
                password: req.body.password,
                message: "Successful Login!!"
            })  
        } catch (error) {
            res.status(error.status).json(error.message)
        }
    },
    register: async (req, res)=>{
        try{
        let foundUser = await User.findOne({username: req.body.username})
        if (foundUser){
            throw{
                status: 409,
                message: "User already exists, please enter a unique user name."
            }}
        let newUser= await createUser(req.body)
        
        let hashedPassword = await hashPassword(newUser.password)
        newUser.password = hashedPassword
        let savedUser = await newUser.save()
        res.status(200).json({
            userObj: savedUser,
            message: "Successfully Registered!  Please Log In."
        })
    }catch (error) {
        res.status(error.status).json(error.message)
    }
    // }
    }
}