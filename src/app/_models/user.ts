import {Role} from './role';

export class User {
    username: string;
    password: string;
    email: string;
    token?: string;
    role: Role;
    code?: number;
    lastLogin: Date;
}
