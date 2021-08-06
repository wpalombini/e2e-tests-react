import React, { useContext } from 'react';
import { RouteProps } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any;
  // tslint:disable-next-line:no-any
  children?: any;
}
const PrivateRoute: (props: PrivateRouteProps) => JSX.Element = (props: PrivateRouteProps): JSX.Element => {
  const { isLoggedIn } = useContext(UXContext);

  const { component: Component, ...rest } = props;

  if (isLoggedIn) {
    return <Route path={props.path} element={<Component {...rest} />} />;
  } else {
    return <Navigate to="/login" state={{ from: props.path }} />;
  }
};

export default PrivateRoute;
