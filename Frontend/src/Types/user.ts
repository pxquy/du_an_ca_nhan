export interface IUsers {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  birthday: string;
  numberPhone: string;
  address: string;
  role: "0" | "1";
  image?: string;
  gender: string;
}

export interface IToken {
  _id: string;
  role: string | null;
  exp: number;
}
