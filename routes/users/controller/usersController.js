// const login =(req, res, next)=>{
// return {
//     username: req.body.username
// }
// }

// module.exports={
//     login
// }

module.exports={
    login: (req, res)=>{
        
        res.send({
            username: req.body.username
        })
    }
}