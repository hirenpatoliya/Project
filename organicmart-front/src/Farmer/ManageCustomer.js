import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listalluser, deleteuser } from "./ApiFarmer";

const ManageCustomer = () => {
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        listalluser().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const goBack = () => (
        <div className="mt-3">
            <Link to="/farmer/dashboard" className="text-secondary">Back to Dashboard</Link>
        </div>
    );
    const destroy = userId => {
        deleteuser(userId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadUser();
            }
        });
    };


    return (
        <Layout title="Manage Customers" description="Manage Customers" className="container">
            <div className="row">
                <div className="col-md-12">
                    {goBack()}
                    <h2 className="text-center">Total {users.length} Registered Customer</h2>
                    <hr />
                    <div className="container">
                     {users.map((u, i) => (
                        <div key={i} className="row mb-3">
                            <div className="col-4"><strong>{u.name}</strong></div>
                            <div className="col-4"><strong>{u.email}</strong></div>
                            <div className="col-4">
                                <button onClick={() => destroy(u._id)} type="button" className="btn btn-danger px-3 rounded-pill shadow-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                    </div>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageCustomer;