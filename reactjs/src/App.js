import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import OTPForm from './components/LoginForm/OTPForm/OTPForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import CustomerView from './components/CustomerView/CustomerView';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import LogoutButton from './components/LogoutButton/LogoutButton';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent'; 

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    
    <Router >
    <div className="App">
      <Header title={title} showError={updateErrorMessage} updateTitle={updateTitle}/>
      <CustomerView/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              {/* <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/> */}
              <Home/>
            </Route>  
            {/* <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route> */}
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
            {/* <PrivateRoute path="/otp">
              <OTPForm/>
            </PrivateRoute> */}
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
    
  );
}

export default App;