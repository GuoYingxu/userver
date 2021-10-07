/**
 * 七牛API
 */
import * as qiniu from 'qiniu'
const accessKey = "MzrBdFaXcbyFkO84NEPdTh6o9-HN-VOIzm_e9b_2"
const secretKey = "zKaVLD3VDf7VHgx9Qmm1h0JNNUgQGJP9tzv6Sh7m"
const bucket ='cq'
export function getToken(){
  var mac = new qiniu.auth.digest.Mac(accessKey,secretKey)
  var options = {
    scope:bucket,
    saveKey:"$(fname)",
    expires:7200
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}