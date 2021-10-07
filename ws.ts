import * as SocketIO from 'socket.io'
import * as _ from 'lodash'
const clientList =[]
let ws 
let iospace
export function createWs(server){
   ws = SocketIO(server)
   iospace = ws.of('/cq')
  ws.of('/cq').on('connection',(socket) => {
    console.log('---- connected')
    clientList.push(socket)
    socket.on('disconnect',() =>{
      console.log('----disconnected')
      _.remove(clientList,socket)
    })
    socket.on('message',(msg,d)=>{
      console.log( msg,d)
      socket.emit('server','hello')
    })
    socket.on('chat',(msg,d)=>{
      console.log( 'chat',msg,d)
    })
  })
}
export function upload(url) {
  clientList.forEach(s => {
    try{
      s.emit('fileupload', url)
    }catch(err) {}
  })
}
export function pass(url) {
  clientList.forEach(s => {
    try{
      s.emit('filepass', url)
    }catch(err) {}
  })
}