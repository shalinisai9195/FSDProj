const jwt = require('jsonwebtoken')
// const { model } = require('mongoose')
const secretKey = 'Yrk%jdks93@kdlsk&nd*mij0'
const bycrpt = require('bcrypt')
const saltRound = 5;

const hashpassword = async (password)=>{

  let salt = await bycrpt.genSalt(saltRound)
  console.log(salt)

  let hash = await bycrpt.hash(password,salt)
  console.log(hash)

  return hash
  
}

const hashcompare = (password,hash)=>{
    return bycrpt.compare(password,hash)
}

const createToken =({firstname,lastname,email,role})=>{
    let token = jwt.sign({firstname,lastname,email,role},secretKey,{expiresIn:'1m'})
    return token
}

const decodedToken = (token)=>{
  let data = jwt.decode(token)
  return data
}

const validate = async(req,res,next)=>{
     try {
       if(req.headers.authorization)
       {
           let token = req.headers.authorization.split(" ")[1]
           let data = decodedToken(token)
          // console.log(data.exp)
         //  console.log(Math.floor(Date.now()/1000)) current tym
           if((Math.floor(Date.now()/1000)) <= data.exp){
              next()
           }
           else{
            res.status(401).send({message:"Token Expired"})
           }

       }else
       {
        res.status(401).send({message:"Token not Found"})
       }
      
     } catch (error) {
        res.status(500).send({message:"Internal error",error})
     }

}

const roleAdmin = async(req,res,next)=>{
  try {
     if(req.headers.authorization){
      let token = req.headers.authorization.split(" ")[1]
      let data = decodedToken(token)
         if(data.role === 'Admin'){
            next()
         }
        else
          {
            res.status(401).send({message:"Only Admin can access"})
          }
     }
     else
     {
      res.status(401).send({message:"Token not Found"})
     }
  } catch (error) {
    res.status(500).send({message:"Internal error",error})
  }

}

module.exports={hashcompare,hashpassword,decodedToken,createToken,validate,roleAdmin}