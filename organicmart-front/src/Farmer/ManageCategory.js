import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./ApiFarmer";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const goBack = () => (
        <div className="mt-3">
            <Link to="/farmer/dashboard" className="text-secondary">Back to Dashboard</Link>
        </div>
    );
    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
            }
        });
    };

    
    return (
        <Layout title="Manage Categories" description="Update or Delete Categoires" className="container">
            <div className="row">
                <div className="col-md-12">
                    {goBack()}
                    <h2 className="text-center">Total {categories.length} Categories</h2>
                    <hr />
                    <div className="container mr-3">
                        {categories.map((c, i) => (
                            <div key={i} className="row mb-4">
                                <div className="col-4"><strong>{c.name}</strong></div>
                                <div className="col-4">
                                    <Link to={`/farmer/category/update/${c._id}`}>
                                        <button type="button" className="btn btn-warning px-3 rounded-pill shadow-sm">Update</button>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => destroy(c._id)} type="button" className="btn btn-danger px-3 rounded-pill shadow-sm">Delete</button>
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

export default ManageCategory;
