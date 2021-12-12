import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { listOrders, getStatusValues, updateOrderStatus } from "./ApiFarmer";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h3 className="text-primary display-4">Total orders: {orders.length}</h3>
            );
        } else {
            return <h3 className="text-danger">No orders</h3>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={e => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    const goBack = () => (
        <div className="mt-2">
            <Link to="/farmer/dashboard" className="text-secondary">Back to Dashboard</Link>
        </div>
    );
    function myFunction() {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    return (
        <Layout title="Orders" description={`${user.name}, you can manage all the orders here`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    <center>{showOrdersLength()}</center>

                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{ borderBottom: "3px solid #00BFFF" }}>
                                {/* <h2 className="mb-5"><span className="bg-success">Order ID: {o._id}</span></h2> */}

                                <ul className="list-group mb-2">
                                    <li className="list-group-item"> {showStatus(o)} </li>
                                    {/* <li className="list-group-item"> Transaction ID: {o.transaction_id} </li> */}
                                    <li className="list-group-item"> Amount: Rs.{o.amount} </li>
                                    <li className="list-group-item"> Ordered by: {o.user.name} </li>
                                    <li className="list-group-item"> Ordered on:{" "} {moment(o.createdAt).fromNow()} </li>
                                    <li className="list-group-item"> Delivery address: {o.address} </li>
                                </ul>


                                <button className="btn btn-primary mb-2" onClick={myFunction}>Product Detail</button>
                                <div id="myDIV">
                                    <h3 className="mt-4 mb-4 font-italic"> Total products in the order:{" "}{o.products.length} </h3>
                                    {o.products.map((p, pIndex) => (
                                        <div className="mb-4" key={pIndex} style={{ padding: "20px", border: "1px solid #1E90FF" }}>
                                            {showInput("Product Name", p.name)}
                                            {showInput("Product Price", p.price)}
                                            {showInput("Total Product", p.count)}
                                            {showInput("Product Id", p._id)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
