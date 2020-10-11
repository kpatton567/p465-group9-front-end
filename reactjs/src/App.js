// import React, {useState} from 'react';
// import './App.css';
// import Header from './components/Header/Header';
// import LoginForm from './components/LoginForm/LoginForm';
// import OTPForm from './components/LoginForm/OTPForm/OTPForm';
// import RegistrationForm from './components/RegistrationForm/RegistrationForm';
// import CustomerView from './components/CustomerView/CustomerView';
// import PublicView from './components/PublicView/PublicView';
// // import PrivateRoute from './utils/PrivateRoute';
// import LogoutButton from './components/LogoutButton/LogoutButton';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import AlertComponent from './components/AlertComponent/AlertComponent'; 
import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';

function App() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      {/* <ProductHowItWorks /> */}
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

// export default withRoot(Index);
export default withRoot(App);