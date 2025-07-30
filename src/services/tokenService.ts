import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string) {
  const decodedToken = jwtDecode(token as string);
  return decodedToken;
}
