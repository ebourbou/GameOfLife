import { User } from '../../shared/model/user';
import { Role } from '../../shared/model/role';

export class UserUtils {
  public static enumSelector(definition) {
    return Object.keys(definition).map((key) => ({ value: definition[key], title: key }));
  }

  public static fromAws(awsUser): User {
    let user: User;
    user = {
      id: awsUser.id,
      username: awsUser.username,
      email: awsUser.email,
      password: 'dummy',
      role: (Role as any)[awsUser.role],
      lastLogin: awsUser.lastLogin,
    };
    return user;
  }

  public static toAwsPattern(user: User): any {
    let u: any;
    u = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: Role.Anonymous,
      lastLogin: new Date(),
    };
    return u;
  }

  static loadUserFromLocal(): User {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      return JSON.parse(sessionStorage.getItem('user'));
    } else {
      return null;
    }
  }
}
