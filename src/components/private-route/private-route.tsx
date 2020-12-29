import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';

export const PrivateRoute: FC<RouteProps> = ({ component, ...args }: RouteProps) => {
    return <Route component={withAuthenticationRequired(component as any)} {...args} />;
};
