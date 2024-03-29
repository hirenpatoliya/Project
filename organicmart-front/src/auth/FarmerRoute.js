import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const FarmerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props} />
    ) : (<Redirect to={{ pathname: '/signup', state: { from: props.location } }} />)
    }
    />
);

export default FarmerRoute;