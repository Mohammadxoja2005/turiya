import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  isWishlistOpen: false,
  items: [],
};

export const WishlistStateContext = createContext();
export const WishlistDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART_POPUP":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case "ADD_TO_CART":
      const id = action.payload.cartItem.id;
      const isOld = state.items.map((item) => item.id).includes(id);
      let cartItems = null;
      if (isOld) {
        const items = state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        cartItems = [...items];
      } else {
        cartItems = [...state.items, action.payload.cartItem];
      }
      return {
        ...state,
        items: cartItems,
      };
    case "MINUS_TO_CART":
      const pk = action.payload.cartItem.id;
      const Old = state.items.map((item) => item.id).includes(pk);
      let cartItemss = null;
      if (Old) {
        const items = state.items.map((item) => {
          if (item.id === pk && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        cartItemss = [...items];
      }
      return {
        ...state,
        items: cartItemss,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.cartItemId
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        ...initialState,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const toggleWishlistPopup = (dispatch) => {
  return dispatch({
    type: "TOGGLE_CART_POPUP",
  });
};

export const addToWishlist = (dispatch, cartItem) => {
  return dispatch({
    type: "ADD_TO_CART",
    payload: {
      cartItem: cartItem,
    },
  });
};

export const removeFromWishlist = (dispatch, cartItemId) => {
  return dispatch({
    type: "REMOVE_FROM_CART",
    payload: {
      cartItemId: cartItemId,
    },
  });
};

export const clearWishlist = (dispatch) => {
  return dispatch({
    type: "CLEAR_CART",
  });
};

const WishlistProvider = ({ children }) => {
  const [persistedCartItems, setPersistedCartItems] = useLocalStorage(
    "wishlist",
    []
  );
  const persistedCartState = {
    isCartOpen: false,
    items: persistedCartItems || [],
  };
  const [state, dispatch] = useReducer(reducer, persistedCartState);
  useEffect(() => {
    setPersistedCartItems(state.items);
  }, [JSON.stringify(state.items)]);
  return (
    <WishlistDispatchContext.Provider value={dispatch}>
      <WishlistStateContext.Provider value={state}>
        {children}
      </WishlistStateContext.Provider>
    </WishlistDispatchContext.Provider>
  );
};

export default WishlistProvider;
