import { User } from '../../shared/model/user';
import { Role } from '../../shared/model/role';

export class UserUtils {
  public static enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

 public static fromAws(awsUser): User {
    let user: User;
    user = {
      id: awsUser.id,
      username: awsUser.username,
      email: awsUser.email,
      password: "dummy",
      role: (<any>Role)[awsUser.role],
      lastLogin: awsUser.lastLogin
    };
    return user;
  }
}
