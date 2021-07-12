import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any;
  // tslint:disable-next-line:no-any
  children?: any;
}
const PrivateRoute: (props: PrivateRouteProps) => JSX.Element = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, children, ...rest } = props;

  const { isLoggedIn } = useContext(UXContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
