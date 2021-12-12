import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/index';
import './signinsignup.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    });
                }
            });
    };
    const signUpForm = () => (
        <div className="login-page">
            <form onSubmit={clickSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                    placeholder="Name" value={name} onChange={handleChange('name')} />

                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={handleChange('email')} />

                <input type="password" name="password" required
                    placeholder="Password" value={password} onChange={handleChange('password')} />

                <div className="row">
                    <button type="submit">Register</button>
                    Already Registered &nbsp;<Link to="/signin">Login</Link>
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

    const showSuccess = () => (
        <div align="Center">
            <div className="alert alert-info col-md-6" style={{ display: success ? '' : 'none' }}>
                New account is created. Please <Link to="/signin">Login</Link>
            </div>
        </div>
    );

    return (
        <Layout title="Register Page" description="REGISTER to Organic Mart" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signup;