/**
 * @author guoyingxu
 * 
 * @description  app 
 *    use express 4.x
 */

 import * as  express from 'express'
 import * as favicon from 'serve-favicon'
 import * as logger from 'morgan'
 import * as methodOverride from 'method-override'
 import * as session  from 'express-session'
 import * as bodyParser from 'body-parser'
 import * as statics from 'serve-static'
 import {join} from 'path'
 import { ApiRouter, PageRouter} from './routes/index'
 const app = express()
 
 app.set('env',process.env.NODE_ENV || 'development')
 app.set('port',process.env.PORT || 3100)
 app.set('views',join(__dirname,'views'))
 app.set('view engine','pug')
 app.locals.title = 'qst 信息追踪平台'
 app.locals.pretty = true
 app.use(favicon(`${__dirname}/public/favicon.ico`))
 app.use(logger('dev'))
 app.use(session({
   resave:true,
   saveUninitialized: true,
   secret:'qst'
 }))
 app.use(bodyParser.json())
 app.use(bodyParser.json({"limit":'10000kb'}))
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(methodOverride())
 app.use(statics(join(__dirname,'public')))
//  app.all('*',function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   if(req.method=="OPTIONS") res.send(202);/*让options请求快速返回*/
//   else  next()
//  })
 
 app.use('/',PageRouter())
 app.use('/api',ApiRouter())
 app.use((req,res,next)=>{
   res.status(404)
   return res.render('404')
 })
 export default app