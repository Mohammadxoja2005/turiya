import React from "react";
import { HashRouter, Route, Routes, BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CartProvider from "./contexts/cart";
import CommonProvider from "./contexts/common";
import WishlistProvider from "./contexts/wishlist";
import About from "./pages/About";
import Basket from "./pages/Basket";
import Card from "./pages/Card";
// import Checkout from "./pages/Checkout";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Politic from "./pages/Politic";
import Profile from "./pages/Profile";
import Public from "./pages/Public";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import ProductShow from "./pages/ProductShop";
import Verify from "./pages/Verify";
import Index from "./pages/payment/Payment";
import OrderLocation from "./pages/OrderLocation";

function App() {
  return (
    <>
      <CommonProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Verify />} path="/verify" />
                <Route element={<Favorite />} path="/favourite" />
                <Route element={<Basket />} path="/basket" />
                <Route element={<Card />} path="/card" />
                <Route element={<About />} path="/about" />
                <Route element={<Politic />} path="/politic" />
                <Route element={<Public />} path="/public" />
                <Route element={<Registration />} path="/registration" />
                <Route element={<Login />} path="/login" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<Shop />} path="/shop" />
                <Route element={<ProductShow />} path="/shop/:filterId" />
                <Route element={<OrderLocation />} path="/location" />
                <Route path="/success/:uuid" element={<Message />} />
                <Route path="/checkout" element={<Index />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </CommonProvider>
    </>
  );
}

export default App;
// pk_test_51MlrVBJ7mapjSr4rb6XsMKY6dP1OjqSFj1aLQXuiDGal2bTUdv8C200RbhYIO1iYnABFG3KIG5b3G8MqJ13a9pVJ00QhPxATVf