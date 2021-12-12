import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import emptycartphoto from '../Photo/empty-cart.png';

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)
    useEffect(() => {
        //console.log('MAX DEPTH ...')
        setItems(getCart())
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />

                {items.map((product, i) =>
                    (<div className="mb-4"><Card key={i} product={product} showViewProductBtn={false} showAddToCartBtn={false} cartUpdate={true} addon={false} removeProductBtn={true} setRun={setRun} run={run} /></div>))}

            </div>
        )
    }
    const noItemsMsg = () => (
          <div><img src={emptycartphoto} alt="" className="img-fluid mb-2" style={{height:'250px',width:'400px' }} /><h2>Your Cart is Empty. <br /><Link to="/shop">Continue shopping</Link></h2></div>
    )

    return (
        <Layout title="Shopping Cart" description="Manage your cart" className="container">
            <div className="row">
                <div className="col-md-4">
                    {items.length > 0 ? showItems(items) : noItemsMsg()}
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;

