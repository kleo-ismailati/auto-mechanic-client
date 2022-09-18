export interface User{
  id: number;
  username: string;
  email: string;
  password?: string;
  role?: string;
}
export interface UserLogin{
  username: string;
  password: string;
}
export interface UserSession{
  token: string,
  type: string,
  id: number,
  username: string,
  email: string,
  roles: string[]
}
