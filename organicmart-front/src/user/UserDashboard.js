import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { orderByuser } from "./ApiUser";

const Dashboard = () => {

    let [order, setOrder] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const token = isAuthenticated().token;

    const init = (userId) => {
        orderByuser(userId).then((data) => {
            setOrder(data);
        })
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card bg-info">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card bg-info mb-5">
                <h3 className="card-header">Customer Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Farmer" : "Registered Customer"}
                    </li>
                </ul>
            </div>
        );
    };

    const orderHistory = () => {
        return (
            <div className="card bg-info mb-5">
                <h3 className="card-header">Order History</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {order.map((o, i) => {
                            return (
                                <div key={i}>
                                    <h6>Order Id: {o._id}</h6>
                                    <h6>Associated Products:
                                        <div>
                                            {o.products.map((p, i) => {
                                                return (
                                                    <div key={i}>
                                                        <h6>{p.name}</h6>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </h6>
                                    <h6>Order Status: {o.status}</h6>
                                    <h6>Total Amount: Rs.{o.amount}</h6>
                                    <h6>Purchased date:{" "} {moment(o.createdAt).fromNow()}</h6>
                                    <h6>Order Address: {o.address}</h6>
                                    <hr />
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={`Welcome to OrganicMart ${name}!`} className="container">
            <div className="row">
                <div className="col-md-3 mb-3">{userLinks()}</div>
                <div className="col-md-9">
                    {userInfo()}
                    {orderHistory()}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
