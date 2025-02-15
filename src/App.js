import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
// import {withAuthentication, withAuthorization} from './session';
import ProtectedRoute from './ProtectedRoute'
// import Dashboard from './Dashboard'
import Dashboard from '../src/views/Dashboard'
import { withFirebase } from './firebase';
import { AuthProvider } from './AuthContext'
import Navigation from './_nav';
 
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <AuthProvider>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <ProtectedRoute path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
              <ProtectedRoute path="/dashboard" render={props => <Dashboard {...props}/>} />
              <ProtectedRoute path="/wilayah" render={props => <Dashboard {...props}/>} />
              
            </Switch>
          </React.Suspense>
          </AuthProvider>
      </HashRouter>
    //   <HashRouter>
    //   <AuthProvider>
    //     <Navigation />
    //     <React.Suspense fallback={loading()}>
    //     <Switch>
    //       <ProtectedRoute path="/dashboard" render={props => <Dashboard {...props}/>} />
    //       <ProtectedRoute path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
              
    //       <Route path="/login" component={Login} />
    //     </Switch>
    //     </React.Suspense>
    //   </AuthProvider>
    // </HashRouter>
    );
  }
}

export default App;
