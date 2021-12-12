import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from './Layout';

const ResetPassword = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const PostData = () => {
       
        fetch("http://127.0.0.1:7000/api/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setEmail("")
                    setSuccess("Password Reset Mail Send to Your Email");
                    setTimeout(() => {
                        history.push("/signin");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    };

    const showError = () => (
        <div align="Center">
            <div className="alert alert-danger col-md-5" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>
    );
    const showSuccess = () => (
        <div align="Center">
            <div className="alert alert-info col-md-5" style={{ display: success ? '' : 'none' }}>
                {success}
            </div>
        </div>
    );
    

    const errhandler = (e) => {
        setEmail(e.target.value);
        if(error){
            setError("");
        }
    }

    return (
        <Layout title="Reset Password" description="Reset your password" className="container">
            {showSuccess()}
            {
            showError()
            }
            <center>
                <div className="col-md-5">
            
                    <div className="card ">
                        <div className="card auth-card input-field">
                            <p className="text-primary m-4" style={{ fontSize: "15px" }}>Enter your email address and we will send you a link to reset your password</p>
                            <div className="col-md-12 mx-auto">
                                <input className="form-control" type="email"   placeholder="email" value={email} onChange={errhandler}/>
                            </div>
                            <button className="btn btn-outline-primary text-dark m-3" onClick={() => PostData()}>Reset Password</button>
                        </div>
                    </div>
                    
                </div>
            </center>
        </Layout>
    );
};

export default ResetPassword;