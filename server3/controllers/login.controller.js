const { User } = require('@models')
const { sign } = require('jsonwebtoken')
require('dotenv').config()


async function login(req, res, next) {

    
        const { username } = req.body

        const result = await User.findOne({username})
        if(!result){
            return res.status(404).send({message:"User not found"});
        }
        
        const { password } = req.body
        const password_match =  compareSync(password, result.password)

        if(password_match){
            result.password = undefined
            const jsonwebtoken = sign(
                {results},
                process.env.JWT_SECRET_KEY,

            )
            return response_format(res,1,"Login Successful",{account: results, token: jsonwebtoken})
        }

        else{
            return response_format(res, 0, "Wrong password!",).status(403)
        }
    
}

module.exports = {
    login
}
   