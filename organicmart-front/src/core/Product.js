import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, relatedlist } from './ApiCore';
import { useParams } from 'react-router';
import Card from './Card';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const SingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProduct(data);
                // fetch related products
                relatedlist(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {

        SingleProduct(productId)
    }, [productId]);

    return (
        <Layout title={product && product.name} description={product && product.description} classname="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        {product && product.description && <Card product={product} showViewProductBtn={false} />}
                    </div>
                    <div className="col-md-3 mb-4"></div>
                    <div className="col-md-4">
                        <h4>Related Product</h4>
                        {relatedProduct.map((p, i) => (<div className="mb-3"><Card key={i} product={p} /></div>))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product;