/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Layout from './Layout';
import aboutphoto from '../Photo/aboutus.jpg'

const AboutUs = () => (
    <Layout title="About Us Page" description="About US">

        <div className="bg-white">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-leaf fa-2x mb-3 text-success"></i>
                        <h2 className="font-weight-light">organicmart</h2>
                        <p className="font-italic text-muted mb-4"> Organic Mart is the place to Sell Organic Products
                            and Customers can order desire organic food products online so they can eat healthy and
                            save money and time.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                        <br></br>
                        <br></br>
                        <h3 className="font-weight-light">Contact Us</h3>
                        <h5 className="font-weight-light"><b>Email : </b>organicmart@gmail.com</h5>
                    </div>
                    <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={aboutphoto} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                </div>
            </div>
        </div>

        <footer className="bg-light pb-5">
            <div className="container text-center">
                <p className="font-italic text-muted mb-0">&copy; Organicmart All rights reserved.</p>
            </div>
        </footer>
    </Layout>
)

export default AboutUs;