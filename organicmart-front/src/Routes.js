import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import ResetPassword from './core/ResetPassword';
import NewPassword from './core/NewPassword';
import Home from './core/Home';
import AboutUs from './core/AboutUs';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import FarmerRoute from './auth/FarmerRoute';
import FarmerDashboard from './user/FarmerDashboard';
import AddCategory from './Farmer/AddCategory';
import AddProduct from './Farmer/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './Farmer/Orders';
import Profile from './user/Profile';
import ManageProducts from './Farmer/ManageProducts';
import UpdateProduct from './Farmer/UpdateProduct';
import ManageCategory from './Farmer/ManageCategory';
import UpdateCategory from './Farmer/UpdateCategory';
import ManageCustomer from './Farmer/ManageCustomer';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/shop" exact component={Shop} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/resetPassword" exact component={ResetPassword} />
                    <Route path="/reset/:token" exact component={NewPassword} />
                    <Route path="/aboutus" exact component={AboutUs} />
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                    <FarmerRoute path="/farmer/dashboard" exact component={FarmerDashboard} />
                    <FarmerRoute path="/create/category" exact component={AddCategory} />
                    <FarmerRoute path="/create/product" exact component={AddProduct} />
                    <FarmerRoute path="/farmer/orders" exact component={Orders} />
                    <FarmerRoute path="/farmer/products" exact component={ManageProducts} />
                    <FarmerRoute path="/farmer/users" exact component={ManageCustomer} />
                    <FarmerRoute path="/farmer/product/update/:productId" exact component={UpdateProduct} />
                    <Route path="/product/:productId" exact component={Product} />
                    <Route path="/cart" exact component={Cart} />
                    <PrivateRoute path="/profile/:userId" exact component={Profile} />
                    <FarmerRoute path="/farmer/categories" exact component={ManageCategory} />
                    <FarmerRoute path="/farmer/category/update/:categoryId" exact component={UpdateCategory} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes;