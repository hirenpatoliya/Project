import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';
import './signinsignup.css';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        Loading: false,
        RedirectToPage: false
    });

    const { email, password, Loading, error, RedirectToPage } = values
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, Loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, Loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            RedirectToPage: true
                        });
                    });
                }
            });
    };
    const signUpForm = () => (
        <div className="login-page">
            <form onSubmit={clickSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={handleChange('email')} />

                <input type="password" name="password" required
                    placeholder="Password" value={password} onChange={handleChange('password')} />

                <div className="row">
                    <button type="submit">Login</button>
                    <p>Don't have Account &nbsp;<Link to="/signup">Register</Link></p>
                    <p>click here to &nbsp;<Link to="/resetPassword">Forgot Password ?</Link></p>
                </div>
            </form>
        </div>
    );
    const showError = () => (
        <div align="Center">
            <div className="alert alert-danger col-md-6" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>
    );

    const showLoading = () => (
        Loading && <div align="center"><div className="alert alert-info col-md-6"><div class="spinner-border text-info" role="status">
        </div></div></div>
    );

    const redirectUser = () => {
        if (RedirectToPage) {
            if (user && user.role === 1) {
                return <Redirect to="/farmer/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout title="Login Page" description="LOGIN to Organic Mart" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
