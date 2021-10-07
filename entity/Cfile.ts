import {BasedIdEntity} from './BaseEntity'
import {Entity,Column, BeforeInsert} from 'typeorm'

@Entity()
export class Cfile extends BasedIdEntity{

  @Column()
  filename:string

  @Column()
  nickname:string 

  @Column()
  phone:string 

  @Column()
  url:string

  @Column({default:0})
  checked:number //0 未审核， 1 通过，2 未通过
  
}