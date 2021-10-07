import {Router} from 'express'
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repository/UserRepository';
export function UserRouter(){
  const router = new Router()
  router.route('/login')
    .post(async(req,res,next) => {
      let username = req.body.username;
      let password = req.body.password;
      console.log(req.body)
      let userRep = getCustomRepository(UserRepository)
      let user = await userRep.login(username,password)
      console.log(user)
      if(user) {
        return res.json({message:'success'})
      }else {
        return res.json({message:'failed'})
      }
    })
  router.route('/init')
    .get(async(req,res,next) => {
      let username = 'admin'
      let password = 'admin1234'
      let userRep = getCustomRepository(UserRepository)
      let user = await userRep.findOne({username})
      try{

        if(user) {
          console.log('--update')
          await userRep.update(user.id,{password})
        }else{
          console.log('---create')
          const temp = userRep.create({username,password})
          await userRep.save(temp)
        }
        res.json({message:'初始化成功！'})
      }catch(err){
        res.json({message:'初始化失败！'})
      }
    })
  return router
}