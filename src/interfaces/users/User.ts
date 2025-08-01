import { UserAddress } from "./UserAddress";
import { UserImage } from "./UserImage";
import { UserName } from "./UserName";

export interface User {
  _id?: string;
  name: UserName;
  phone: string;
  email: string;
  password: string;
  image: UserImage;
  address: UserAddress;
  isBusiness: boolean;
  isAdmin?: boolean;
}
