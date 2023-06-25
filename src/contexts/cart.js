import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  isCartOpen: false,
  items: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 0,
};

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

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

        const stringCartItems = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", stringCartItems);

        const payMentDetail = {
          allPrice: 0,
          allQuantity: 0,
          deliverPrice: 5000,
        };

        let allProductsPrice = 0;
        let allProductQuantity = 0;

        cartItems.map((product) => {
          allProductsPrice += product.new_price ? product.quantity * product.new_price : product.quantity * product.price;
          allProductQuantity += product.quantity;
        })

        payMentDetail.allPrice = allProductsPrice;
        payMentDetail.allQuantity = allProductQuantity;

        const paymentDetailString = JSON.stringify(payMentDetail)

        localStorage.setItem("paymentInfo", paymentDetailString)

      } else {

        cartItems = [...state.items, action.payload.cartItem];
        const stringCartItems = JSON.stringify(cartItems);

        localStorage.setItem("cartItems", stringCartItems)

        const payMentDetail = {
          allPrice: 0,
          allQuantity: 0,
          deliverPrice: 5000,
        };

        let allProductsPrice = 0;
        let allProductQuantity = 0;

        cartItems.map((product) => {
          allProductsPrice += product.new_price ? product.quantity * product.new_price : product.quantity * product.price;
          allProductQuantity += product.quantity;
        })

        payMentDetail.allPrice = allProductsPrice;
        payMentDetail.allQuantity = allProductQuantity;

        const paymentDetailString = JSON.stringify(payMentDetail)

        localStorage.setItem("paymentInfo", paymentDetailString)

        localStorage.setItem("cartItems", stringCartItems);
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

        const stringCartItems = JSON.stringify(cartItemss);

        localStorage.setItem("cartItems", stringCartItems)

        const payMentDetail = {
          allPrice: 0,
          allQuantity: 0,
          deliverPrice: 5000,
        };

        let allProductsPrice = 0;
        let allProductQuantity = 0;

        cartItemss.map((product) => {
          allProductsPrice += product.new_price ? product.quantity * product.new_price : product.quantity * product.price;
          allProductQuantity += product.quantity;
        })

        payMentDetail.allPrice = allProductsPrice;
        payMentDetail.allQuantity = allProductQuantity;

        const paymentDetailString = JSON.stringify(payMentDetail)

        localStorage.setItem("paymentInfo", paymentDetailString)
      }
      return {
        ...state,
        items: cartItemss,
      };
    case "REMOVE_FROM_CART":

      const products = state.items.filter(
        (item) => item.id !== action.payload.cartItemId
      )

      const stringProducts = JSON.stringify(products);
      // localStorage.setItem('cartItems', stringProducts);

      // cartItems = [...state.items, action.payload.cartItem];
      // const stringCartItems = JSON.stringify(cartItems);

      localStorage.setItem("cartItems", stringProducts)

      const payMentDetail = {
        allPrice: 0,
        allQuantity: 0,
        deliverPrice: 5000,
      };

      let allProductsPrice = 0;
      let allProductQuantity = 0;

      products.map((product) => {
        allProductsPrice += product.new_price ? product.quantity * product.new_price : product.quantity * product.price;
        allProductQuantity += product.quantity;
      })

      payMentDetail.allPrice = allProductsPrice;
      payMentDetail.allQuantity = allProductQuantity;

      const paymentDetailString = JSON.stringify(payMentDetail)

      localStorage.setItem("paymentInfo", paymentDetailString)

      localStorage.setItem("cartItems", stringProducts);

      return {
        ...state,
        items: products,
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

export const toggleCartPopup = (dispatch) => {
  return dispatch({
    type: "TOGGLE_CART_POPUP",
  });
};

export const addToCart = async (dispatch, cartItem) => {
  return dispatch({
    type: "ADD_TO_CART",
    payload: {
      cartItem: cartItem,
    },
  });
};

export const minusToCart = async (dispatch, cartItem) => {
  return dispatch({
    type: "MINUS_TO_CART",
    payload: {
      cartItem: cartItem,
    },
  });
};

export const removeFromCart = async (dispatch, cartItemId) => {
  return dispatch({
    type: "REMOVE_FROM_CART",
    payload: {
      cartItemId: cartItemId,
    },
  });
};

// export const paymentBasket = () => {
//   const products = JSON.parse(localStorage.getItem('cartItems'))

//   const payMentDetail = {
//     allPrice: 0,
//     allQuantity: 0,
//     deliverPrice: 5000,
//   };

//   let allProductsPrice = 0;
//   let allProductQuantity = 0;

//   products.map((product) => {
//     allProductsPrice += product.quantity * product.price;
//     allProductQuantity += product.quantity;
//   })

//   payMentDetail.allPrice = allProductsPrice;
//   payMentDetail.allQuantity = allProductQuantity;

//   setProductPayInfo(payMentDetail);
// }

export const clearCart = (dispatch) => {
  return dispatch({
    type: "CLEAR_CART",
  });
};

const CartProvider = ({ children }) => {
  const [persistedCartItems, setPersistedCartItems] = useLocalStorage(
    "cartItems",
    []
  );

  const persistedCartState = {
    isCartOpen: false,
    items: persistedCartItems || [],
  };

  const [state, dispatch] = useReducer(reducer, persistedCartState);

  // useEffect(() => {
  //   setPersistedCartItems(state.items);
  // }, [JSON.stringify(state.items)]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
