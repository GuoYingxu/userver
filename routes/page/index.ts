import { Router } from 'express'
const router = new Router()
export function PageRouter(){
  router.get('/index',(req,res,next)=>{
    res.render('index')
  })
  return router
}