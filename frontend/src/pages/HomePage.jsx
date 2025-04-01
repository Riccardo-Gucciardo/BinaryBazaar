import { useEffect, useState } from "react"
import axios from 'axios'
// import ProductsList from "./ProductsList"
import Card from "../components/Card"
import Hero from "../components/Hero"
import { Link } from "react-router-dom"

export default function HomePage() {

    const [products, setProducts] = useState([])

    const fetchProducts = () => {
        axios.get('http://localhost:3000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }

    useEffect(fetchProducts, [])

    const renderPoducts = () => {
        return (
            products.map((product) => {
                return (

                    <Link to={`/${product.slug}?category=${product.category}`} key={product.id}>
                        <Card product={product} />
                    </Link>
                )
            })
        )
    }


    return (
        <>
            <Hero />
            <h1>i nostri prodotti</h1>
            <div className="container mx-auto row row-cols-md-3 row-cols-lg-4 g-1">
                {/* <Card/> */}
                {renderPoducts()}
            </div>


        </>
    )
}