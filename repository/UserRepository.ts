import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   *  登录
   * @param username 用户名
   * @param password 密码
   */
  login(username,password){
    return this.findOne({username,password})
  }
}