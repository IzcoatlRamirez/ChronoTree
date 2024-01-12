import jwt from 'jsonwebtoken'
import { tokenSecret } from '../config'


export async function createAcessToken(payload:string){
    if(!tokenSecret){
        return "tokensecret is not defined"
    }
    return new Promise((resolve,reject)=>{
        jwt.sign(
            {data:payload}, 
            tokenSecret, 
            {
                expiresIn: "1d"
            },
            (err,token)=>{
                if(err) reject(err)
                resolve(token)
          })
    })
}   
