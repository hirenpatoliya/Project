import React from 'react';
import Menu from './Menu';
import '../style.css';

const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <Menu />
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;