import {Entity,Column} from 'typeorm'
import {BasedIdEntity} from './BaseEntity'

@Entity() 
export class File extends BasedIdEntity {

  @Column()
  url: string 

  @Column()
  type: string 

  @Column()
  nickname:string 

  @Column()
  phone: string 


}