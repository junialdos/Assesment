import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import './App.scss';
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Login from './views/Pages/Login'
// import Dashboard from './Dashboard'
import Dashboard from '../src/views/Dashboard'

import Navigation from './Header'
import ProtectedRoute from './ProtectedRoute'
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './firebase';
import 'mdbreact/dist/css/mdb.css';
import App from './App';

// const App = () => (
//   <div>
//     <Router>
//       <AuthProvider>
//         <Navigation />
//         <Switch>
//           <ProtectedRoute path="/dashboard" component={Dashboard} />
//           <Route path="/" component={Login} />
//         </Switch>
//       </AuthProvider>
//     </Router>
//   </div>
// )

render(
  // <App />, document.getElementById('root')
  <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
     document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
// )

// ReactDOM.render(
//   <FirebaseContext.Provider value={new Firebase()}>
//       <App />
//     </FirebaseContext.Provider>,
//      document.getElementById('root'));
  
//   // If you want your app to work offline and load faster, you can change
//   // unregister() to register() below. Note this comes with some pitfalls.
//   // Learn more about service workers: http://bit.ly/CRA-PWA
//   serviceWorker.unregister();
