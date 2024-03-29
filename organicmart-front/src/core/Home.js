import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './ApiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout title="Home Page" description="Organic Mart" classname="container">
            <div className="container">
                <Search />
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((product, i) => (<div key={i} className="col-md-4  mb-4"><Card product={product} /></div>))}
                </div>
                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((product, i) => (<div key={i} className="col-md-4  mb-4"><Card product={product} /></div>))}
                </div>
            </div>
        </Layout>
    )

}


export default Home;