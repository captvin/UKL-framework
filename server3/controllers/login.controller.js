const { user } = require('@models')
const { sign } = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const {NotFound} = require('http-errors')


    async function login(req, res, next) {

        try{

            const { username } = req.body

            const result = await user.findOne({where: {username}})
            if(!result){
                return res.status(404).send({message:"User not found"});
            }
            
            const { password } = req.body
            // const password_match = bcrypt.compareSync(password, result.password)
            const password_match = await user.findOne({where: {password}})

            if(password_match){
                result.password = undefined
                const jsonwebtoken = sign(
                    {result},
                    process.env.JWT_SECRET_KEY,

                )
                return res.status(200).send({message:"Successfully login", jsonwebtoken})
                // return (res,1,"Login Successful",{account: results, token: jsonwebtoken})
                // result[1]
                //      res.json({ message: 'Successfully login' , jsonwebtoken})
        
            }

            else{
                // return (res, 0, "Wrong password!").status(403)
                return res.status(403).send({message:"Wrong password"})
            }
        } catch (err) {
            console.log(err)
        }
        
    
    }

    module.exports = {
        login
    }





   