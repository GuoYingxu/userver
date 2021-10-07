/**
 * @auther  郭英旭
 * 
 * @description  start a server 
 */

 import app from './app'
 import * as http from 'http'
 import  { createConnection } from 'typeorm'
 import {createWs} from './ws'
 const server = http.createServer(app)
 createWs(server)
 createConnection().then(connection => {
   server.listen(3101,()=>{
     console.log('Express server start at : ',3101)
   })
 }).catch( error => {
   console.log('ERROR:',error)
 })