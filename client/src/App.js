import React, {Fragment} from 'react';
import './App.css';
import './MyStyle.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthtoken from './utils/setAuthtoken';
import PrivateRoute from './components/routing/PrivateRoutes';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

if(localStorage.token){
  setAuthtoken(localStorage.token);
}

const App = () => {
  return (
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <div className="mymain">
                  <Navbar/>
                  <div className="container">
                    <Switch>
                      <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                      <Route exact path='/about' component={About}></Route>
                      <Route exact path='/register' component={Register}></Route>
                      <Route exact path='/login' component={Login}></Route>
                    </Switch>
                  </div>
                  <Footer/>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
  )
}

export default App

