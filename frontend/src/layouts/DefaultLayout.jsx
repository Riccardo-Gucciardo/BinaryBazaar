import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/Footer'

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main className='main-box' >
                <Outlet />
            </main>
            <Footer />

        </>



    )
}