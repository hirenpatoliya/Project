import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { isAuthenticated } from "../auth";

const Card = ({ product, showViewProductBtn = true, showAddToCartBtn = true, cartUpdate = false, removeProductBtn = false, setRun = f => f, run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    const showViewBtn = (showViewProductBtn) => {
        return (
            showViewProductBtn && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2" style={{ width: '50%' }}>View Product</button>
                </Link>
            )
        )
    }
    const addToCart = () => {
        addItem(product, setRedirect(true))
    }
    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/shop" />
        }
    }

    const showAddToCart = showAddToCartBtn => {
        return (showAddToCartBtn && (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 ml-2" style={{ width: '45%' }}>Add to cart</button>
        )
        )
    }
    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-danger badge-pill">Out Of Stock</span>
        )
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (<div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} max={product.quantity} onChange={handleChange(product._id)} />
            </div>
        </div>)
    }
    const showRemoveCart = removeProductBtn => {
        return (removeProductBtn && (
            <button onClick={() => removeItem(product._id, setRun(!run))} className="btn btn-outline-danger mt-2 mb-2" style={{ width: '100%' }}> Remove Product </button>
        )
        )
    }

    return (
        <div className="container"> 
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage className="" item={product} url="product" />
                    <p className="lead mt-2">{product.description}</p>
                    <p className="black-10">Rs.{product.price} Per Kg</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()} </p>
                    {showStock(product.quantity)}<br />
                    {showViewBtn(showViewProductBtn)}
                    {!isAuthenticated() && showAddToCart(showAddToCartBtn)}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && showAddToCart(showAddToCartBtn)}
                    {showRemoveCart(removeProductBtn)}
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div> 
        </div>
    )
}

export default Card;