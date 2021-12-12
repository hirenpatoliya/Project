import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./ApiFarmer";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const goBack = () => (
        <div className="mt-3">
            <Link to="/farmer/dashboard" className="text-secondary">Back to Dashboard</Link>
        </div>
    );

    return (
        <Layout title="Manage Products" description="Update or Delete Products" className="container">
            <div className="row">
                <div className="col-md-12">
                    {goBack()}
                    <h2 className="text-center">Total {products.length} products</h2>
                    <hr />
                    <div className="container mr-3">
                        {products.map((p, i) => (
                            <div key={i} className="row mb-4">
                                <div className="col-4"><strong>{p.name}</strong></div>
                                <div className="col-4">
                                    <Link to={`/farmer/product/update/${p._id}`}>
                                        <button type="button" className="btn btn-warning px-3 rounded-pill shadow-sm">Update</button>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => destroy(p._id)} type="button" className="btn btn-danger px-3 rounded-pill shadow-sm">Delete</button>
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

export default ManageProducts;
