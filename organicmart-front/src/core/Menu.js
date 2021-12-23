import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
import { itemTot } from './cartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#000000' };
    } else {
        return { color: '#FFFFFF' };
    }
}

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-3">
        <a className="navbar-brand" href="/"><strong>OrganicMart</strong></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/"><i className="fa fa-fw fa-home"></i>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/shop")} to="/shop"><i className="fa fa-fw fa-shopping-bag"></i>Shopping</Link>
                </li>

           
               

                {isAuthenticated() && isAuthenticated().user.role === 0 && (<>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard"><i className="fa fa-id-card"></i> Customer Dashboard</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/cart")} to="/cart"><i className="fa fa-fw fa-shopping-cart"></i>Cart<sup><small className="cart-badge">{itemTot()}</small></sup></Link>
                </li>
                    </>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/farmer/dashboard")} to="/farmer/dashboard"><i className="fa fa-tachometer"></i> Farmer Dashboard</Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/cart")} to="/cart"><i className="fa fa-fw fa-shopping-cart"></i>Cart<sup><small className="cart-badge">{itemTot()}</small></sup></Link>
                </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin"><i className="fa fa-fw fa-user"></i>Login ✥ Register</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link"
                            style={{ cursor: 'pointer', color: '#ffffff' }}
                            onClick={() => signout(() => { history.push('/'); })}><i className="fa fa-fw fa-sign-out"></i>Signout</span>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/aboutus")} to="/aboutus"><i className="fa fa-life-ring"></i> About Us</Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default withRouter(Menu);