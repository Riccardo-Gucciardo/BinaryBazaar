import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/ChatBot";
import CartOffcanvas from "../components/CartOffcanvas";
import ScrollUp from "../components/ScrollUpArrow";
import WelcomePopup from "../components/WelcomePopup";


export default function DefaultLayout() {
    const location = useLocation()
    const isRightPath =
        location.pathname === '/home' ||
        location.pathname.startsWith('/products')
    return (
        <>
            <Header />
            <main className="main-box">
                <Outlet />
                <WelcomePopup />
                {/* Header, nav, contenuto, footer ecc. */}
            </main>
            {isRightPath && <Chatbot />}
            <CartOffcanvas />
            <ScrollUp />
            <Footer />

        </>
    );
}