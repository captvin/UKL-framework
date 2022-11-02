const { user } = require('@models')
const {tokenGenerator}= require('@utils/tokenGenerator')
const bcrypt = require('bcrypt');


    async function login(req, res, next) {

        // try{

            const { username } = req.body

            const result = await user.findOne({where: {username}})
            if(!result){
                return res.status(404).send({message:"User not found"});
            }
            
            
            const { password } = req.body
            const password_match = await bcrypt.compare(password, result.password)
    

            
            // const password_match = await user.findOne({where: {password}})

            if(password_match){
                const id = (result.id)
                const role = (result.role)
                const token = await tokenGenerator({id,role})
                // const jsonwebtoken = sign(
                //     {result},
                //     process.env.JWT_SECRET_KEY,

                // )
                return res.json({  
                                    logged: true,
                                    data: result,
                                    token : token
                                })
                // return (res,1,"Login Successful",{account: results, token: jsonwebtoken})
                // result[1]
                //      res.json({ message: 'Successfully login' , jsonwebtoken})
        
            }

            else{
                // return (res, 0, "Wrong password!").status(403)
                return res.status(403).send({message:"Wrong password"})
            }
        // } catch (err) {
        //     console.log(err)
        // }
        
    
    }

    module.exports = {
        login
    }





   