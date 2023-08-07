export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}
