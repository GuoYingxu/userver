import { Router } from 'express'
import {getCustomRepository, In} from 'typeorm'
import { CFileRepository} from '../../repository/CFileRepository'
import { upload ,pass} from '../../ws'
import * as path from 'path'
import * as fs from 'fs'
import { fstat } from 'fs'
export function FileRouter(){
  const router = new Router()
  router.route('/send')
    .post((req,res,next) => {
      let filerep = getCustomRepository(CFileRepository)
      return filerep.saveFile(req.body).then(f=>{
        upload(f.url)
        return res.json(f)
      }).catch( err => {
        return res.status(500).json(err)
      })
    })
  router.route('/pass').get((req,res,next) => {
    let id = req.query.id
    let filerep = getCustomRepository(CFileRepository)
    return filerep.update(id,{checked:1}).then(f => {
     
      filerep.findOne(id).then(file => {
        pass(file.url) 
      })
      return res.json({message:'success'})
    }).catch(err => {
      return res.status(500).json(err)
    })
  })
  router.route('/unpass').get((req,res,next) => {
    let id = req.query.id
    let filerep = getCustomRepository(CFileRepository)
    return filerep.update(id,{checked:2}).then(file => {
      return res.json({message:'success'})
    }).catch(err => {
      return res.status(500).json(err)
    })
  })
  router.route('/del').get(async(req,res,next) => {
    let id = req.query.id
    let filerep = getCustomRepository(CFileRepository)
    try{
      let file = await filerep.findOne(id)
      let p = path.join('./public/upload/',file.url)
      fs.unlinkSync(p)
    }catch(err){
      console.log('删除失败')
    }
    return filerep.delete(id).then(file => {
      return res.json({message:'success'})
    }).catch(err => {
      return res.status(500).json(err)
    })
  })
  router.route('/').get(async(req,res,next) => {
      const filerep = getCustomRepository(CFileRepository)
      let list = await filerep.getFileList({
        ...req.query
      })
      let total = await filerep.getFileListCount({...req.query})
      return res.json({code:200,data:{list,total},message:'success'})
    })
  return router;
}