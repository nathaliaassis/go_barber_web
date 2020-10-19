import React from 'react';
import { RouteProps as ReactDOMRouterProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

//extends pega todas as props do Router Props e adiciona as proximas declaradas
interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  console.log(user, isPrivate)
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            //se for uma rota autenticada, irá direcionar ao login,
            //dashboard senão direcionará para o
            <Redirect to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }} />
          )
      }}
    />
  );
}

export default Route;
