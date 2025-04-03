import DefaultLayout from "./layouts/DefaultLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckOut from './pages/CheckOut'
import ProductList from "./pages/ProductsList";
import AllDone from "./pages/AllDone";


function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={HomePage} />
              <Route path="/:slug/" Component={ProductPage} />
              <Route path="/checkout" Component={CheckOut} />
              <Route path="/products" Component={ProductList} />
              <Route path="/allDone" Component={AllDone} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter></>

  )
}

export default App;
