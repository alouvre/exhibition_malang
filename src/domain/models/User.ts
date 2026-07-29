export interface IUser {
  id: string | number;
  name: string;
  avatar: string;
  isMe: boolean;
}

export class User implements IUser {
  public id: string | number;
  public name: string;
  public avatar: string;
  public isMe: boolean;

  constructor(id: string | number, name: string, avatar: string, isMe = false) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.isMe = isMe;
  }
}

export default User;
