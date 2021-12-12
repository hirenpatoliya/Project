import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './ApiFarmer';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError('');
                    setSuccess(true);
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="form-group">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary">Add Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h4 className="text-success">{name} Category is Added</h4>;
        }
    }

    const showError = () => {
        if (error) {
            return <h4 className="text-danger">Category should be unique</h4>;
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/farmer/dashboard" className="text-secondary">Back to Dashboard</Link>
        </div>
    );

    return (
        <Layout title="Add a new category" description={`${user.name}, ready to add new category?`} >
            <div className="row">
                <div className="container">
                        {goBack()}
                    <div className="col-md-6 offset-md-3">
                        {showSuccess()}
                        {showError()}
                        {newCategoryForm()}
                    </div>
                </div>
            </div>
        </Layout>
    );

};

export default AddCategory;