import { IUser } from "../models/IUser";
import { decrypt, encrypt } from "./aes";

export function setUser(user: IUser) {
  localStorage.setItem("user", encrypt(JSON.stringify(user)));
}

export function getUser(): IUser | null {
  const stUser = localStorage.getItem("user");
  if (stUser != null) {
    try {
      const user = JSON.parse(decrypt(stUser)) as IUser;
      return user;
    } catch (error) {
      localStorage.removeItem("user");
    }
  }
  return null;
}

// function getCart()
// {
//   const cartLocal = localStorage.getItem("cart")
//   if (cartLocal != null) {
//     try {
//       const cart = JSON.parse(decrypt(cartLocal)) as ICartitem;
//       return cart;
//     } catch (error) {
//     }
//   }
//   return null;
// }

// export function setCart(cart: ICartitem) {
//   localStorage.setItem("cart", encrypt(JSON.stringify(cart)));
// }