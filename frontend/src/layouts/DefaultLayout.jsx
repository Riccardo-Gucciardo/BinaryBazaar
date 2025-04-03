import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartOffcanvas from "../components/CartOffcanvas";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main className="main-box">
                <Outlet />
            </main>
            <CartOffcanvas />
            {/* <Footer /> commentato SOLO PER ORA */}
        </>
    );
}