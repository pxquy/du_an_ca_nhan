export interface IUsers {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  numberPhone: string;
  address: string;
  role: "0" | "1";
  image?: string;
  gender: string;
}
