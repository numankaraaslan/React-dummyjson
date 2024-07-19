import { createContext, useState } from "react";
import { ICartitem } from "../models/ICartitem";

// context te tutulacak veri yapısı, default değerler DEĞİL !!!!
export const CartContext = createContext({
  cartItemsInsideContext: [] as ICartitem[],
  addToCartFunctionOfContext: (cartItem: ICartitem) => {},
  removeFromCartFunctionOfContext: (id: number) => {},
});

// context e dışardan erişim sağlayacak provider
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemsState, setCartItemsState] = useState<ICartitem[]>([]);

  function addToCartState(cartItem: ICartitem) {
    setCartItemsState([...cartItemsState, cartItem]);
  }
  function removeFromCartState(itemID: number) {
    setCartItemsState(cartItemsState.filter((someItem) => someItem.id != itemID));
  }
  return (
    <CartContext.Provider
      value={{
        cartItemsInsideContext: cartItemsState,
        addToCartFunctionOfContext: addToCartState,
        removeFromCartFunctionOfContext: removeFromCartState,
      }}
    >
      {/* içerisine component yerleştirilebilsin diye */}
      {children}
    </CartContext.Provider>
  );
};
