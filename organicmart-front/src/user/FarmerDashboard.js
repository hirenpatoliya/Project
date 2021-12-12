import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { saveAs} from 'file-saver'; 
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
 
import { API } from '../config';
import {listOrders} from "../Farmer/ApiFarmer";

const FarmerDashboard = () => {
    const { user: {_id, name, email, role }, token } = isAuthenticated();
    const [orders,setOrders ]= useState([]);

    useEffect(()=>{
        listOrders(token).then((data)=>{
            setOrders(data);
        })
    },[])

    const farmerLinks = () => {
        return (
            <div className="card bg-info mb-3">
                <h4 className="card-header">Farmer Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Add Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Add Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/farmer/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/farmer/categories">Manage Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/farmer/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/farmer/users">Manage Customer</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const farmerInfo = () => {
        return (
            <div className="card bg-info mb-5">
                <h3 className="card-header">Farmer Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Farmer' : 'Registered Customer'}</li>
                    <li className="list-group-item"><button onClick={genrateReport} className="btn btn-primary" style={{ width: '100%' }}>Generate Report</button></li>
                </ul>
            </div>
        )
    }

    const genrateReport = () => {
        console.log(orders);
        axios.post(`${API}/pdf/create`, orders,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => axios.get(`${API}/fetch-pdf`, { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
          saveAs(pdfBlob, 'Report.pdf');    
        })
     }



    return (
        <Layout title="Dashboard" description={`Welcome ${name}`} className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        {farmerLinks()}
                    </div>
                    <div className="col-md-9">
                        {farmerInfo()}
                    
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FarmerDashboard;