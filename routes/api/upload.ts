import {Router} from 'express'
import * as fs from 'fs'
import { runInNewContext } from 'vm'
const router = new Router()
export function UploaderRouter(){
  router.route('/file')
    .get((req,res,next) => {
      return res.json({message:'请使用Post方法上传文件'})
    })
    .post((req,res,next) => {
      const reqData = [];
      let size =0;
      req.on('data',function(data){
        reqData.push(data);
        size+= data.length;
      })
      req.on('end',function(){
        req.reqData = Buffer.concat(reqData,size)
        const date = new Date()
        const fileName= `file_${date.getTime()}`
        fs.writeFileSync('./public/upload/'+fileName,req.reqData)
        return res.json({path: fileName})
      })
    })
   return router
}