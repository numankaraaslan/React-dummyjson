import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./utils/Site.css";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Control from "./pages/Control";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import { CartContextProvider } from "./utils/CartContext";

// routes
const router = (
  <CartContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Control item={<Dashboard />} />} />
        <Route path="/profile" element={<Control item={<Profile />} />} />
        <Route path="/productDetail/:pid" element={<Control item={<ProductDetail />} />} />
        <Route path="/search" element={<Control item={<Search />} />} />
      </Routes>
    </BrowserRouter>
  </CartContextProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(router);
