import { Router } from 'express'
import {UploaderRouter} from './upload'
import { FileRouter } from './file'
import {UserRouter} from './user'
import { QiniuRouter } from './qiniu'
const router = new Router()

export function ApiRouter(){
  router.use('/list',(req,res,next)=>{
    res.send('abgagdasg')
  })
  router.use('/upload',UploaderRouter())
  router.use('/file',FileRouter())
  router.use('/user',UserRouter())
  router.use('/qiniu',QiniuRouter())
  return router
}