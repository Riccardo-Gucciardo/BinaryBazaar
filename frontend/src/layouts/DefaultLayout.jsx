import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/ChatBot";
import CartOffcanvas from "../components/CartOffcanvas";


export default function DefaultLayout() {
    const location = useLocation()
    const isRightPath =
        location.pathname === '/' ||
        location.pathname.startsWith('/products')
    return (
        <>
            <Header />
            <main className="main-box">
                <Outlet />
            </main>
            {isRightPath && <Chatbot />}
            <CartOffcanvas />
            <Footer />
        </>
    );
}