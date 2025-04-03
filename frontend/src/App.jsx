import DefaultLayout from "./layouts/DefaultLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import { CartProvider } from "./contexts/CartContext";

import CheckOut from './pages/CheckOut'


function App() {
  return (
    <>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/:slug/" Component={ProductPage} />
            <Route path="/checkout" Component={CheckOut} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </>

  )
}

export default App;
