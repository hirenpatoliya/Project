import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getProduct, getCategories, updateProduct } from './ApiFarmer';
import { Link, Redirect } from 'react-router-dom';

const UpdateProduct = ({ match }) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: true,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        // category,
        // shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, name: data.name, description: data.description, price: data.price, category: data.category._id, shipping: data.shipping, quantity: data.quantity, formData: new FormData() });
                initCategories()
            }
        })
    }
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ categories: data, formData: new FormData() })
            }
        })
    }
    useEffect(() => {
        init(match.params.productId)
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, error: false, redirectToProfile: true,
                        createdProduct: data.name
                    })
                }
            })
    }

    const updateproductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <center>
                    <label className="btn btn-outline-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                    </label>
                </center>
            </div>
            <div className="form-group">
                <label className="form-group">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="form-group">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="form-group">price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="form-group">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Select Category</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="form-group">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-group">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <center><button className="btn btn-outline-primary">Update Product</button></center>
        </form>

    );

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (<div className='alert alert-success'>
            <h2>Loading...</h2>
        </div>)
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/shop" />
            }
        }
    }

    const goBack = () => (
        <div className="mt-3 ml-3">
            <Link to="/farmer/products" className="text-secondary">Back To Manage Products</Link>
        </div>
    );
    return (
        <Layout title={`Hi ${user.name}`} description={`${user.name}, ready to update product?`} >
            <div className="row">
                <div className="container">
                    {goBack()}
                    <div className="col-md-6 offset-md-3">
                        {showLoading()}
                        {showSuccess()}
                        {showError()}
                        {updateproductForm()}
                        {redirectUser()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;