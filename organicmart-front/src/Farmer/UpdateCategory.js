import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './ApiFarmer';

const UpdateCategory = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = categoryId => {
        getCategory(categoryId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({ ...values, name: data.name });
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        const category = { name: name };
        updateCategory(match.params.categoryId, user._id, token, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateCategoryForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="mb-5" onSubmit={submitCategoryForm}>
                <div className="wrap-input100 validate-input mb-3">
                    <input onChange={handleChange('name')} value={name} className="input100" type="text" required name="name" />
                </div>
                <div className="w-size25">
                    <button type="submit" className="btn btn-outline-primary flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">Update Category</button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/farmer/categories" />;
            }
        }
    };

    const goBack = () => (
        <div className="mt-3 ml-3">
            <Link to="/farmer/categories" className="text-secondary">Back To Manage Categories</Link>
        </div>
    );

    return (
        <Layout title={`Hi ${user.name}`} description={`${user.name}, ready to update product?`} >
            <div className="row">
                <div className="container">
                    {goBack()}
                    <div className="col-md-6 offset-md-3">
                        {showError()}
                        {updateCategoryForm()}
                        {redirectUser()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateCategory;
