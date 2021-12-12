import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "./Layout";

const NewPassword = () => {

    const history = useHistory();
    const [password, setPasword] = useState("");
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const { token } = useParams();
    console.log(token);
    const PostData = () => {
        fetch("http://127.0.0.1:7000/api/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess("Your Password Has Been Reset");
                    setTimeout(() => {
                        history.push("/signin");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const errhandler = (e) => {
        setPasword(e.target.value);
        if(error){
            setError("");
        }
    }
    const showError = () => (
        <div align="Center">
            <div className="alert alert-danger col-md-5" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>
    );
    const showSuccess = () => (
        <div align="Center">
            <div className="alert alert-info col-md-6" style={{ display: success ? '' : 'none' }}>
                {success}
            </div>
        </div>
    );

    return (
        <Layout title="Update Password" description="Change your password" className="container">
            {showError()}
            {showSuccess()}
            <center>
                <div className="col-md-5">
                        <div className="card auth-card input-field">
                            <h4 className="text-center text-info">Enter Your New Password</h4>
                            <div className="m-3">
                                <input className="form-control" type="password" placeholder="New Password" value={password} onChange={errhandler} />
                            </div>
                            <button style={{ marginRight: "10px", marginLeft: "10px", marginBottom: "10px" }} className="btn btn-outline-warning text-dark "
                                onClick={() => PostData()}>Update password</button>
                        </div>
                </div>
            </center>
        </Layout>
    );
};

export default NewPassword;