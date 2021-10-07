import {EntityRepository , Repository} from 'typeorm'
import {Cfile} from '../entity/Cfile'

@EntityRepository(Cfile)

export class CFileRepository extends Repository<Cfile> {
  /**
   * 保存
   * @param file 
   */
  saveFile(file) {
    const cfile  = new Cfile()
    cfile.nickname = file.nickname;
    cfile.phone = file.phone;
    cfile.filename = file.filename
    cfile.url = file.url
    return this.save(cfile)
  }
  getFileList(filter) {
    let query = this.createQueryBuilder('cfile')
    if(filter.check){
      query = query.where('cfile.checked=:ownerType',{ownerType:filter.check})
    }
    query = query.orderBy('cfile.id','DESC')
    if(filter.per){
      const page = filter.page || 1
      query = query.skip((page-1)*filter.per).take(filter.per)
    }
    return query.getMany()
  }
  getFileListCount(filter) {
    let query = this.createQueryBuilder('cfile')
    if(filter.check){
      query = query.where('cfile.checked=:ownerType',{ownerType:filter.check})
    } 
    return query.getCount()
  }
}