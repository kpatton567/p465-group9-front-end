import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Global } from "@emotion/react";

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {Avatar} from '../../../CometChat';
import { COMETCHAT_CONSTANTS } from '../../../consts';

import {
  wrapperStyle,
  errorStyle,
  titleStyle,
  subtitleStyle,
  userContainerStyle,
  userWrapperStyle,
  thumbnailWrapperStyle,
  uidWrapperStyle,
  inputWrapperStyle,
  loginBtn,
} from "./style";

import { loaderStyle } from "./loader";

import * as actions from '../../../store/action';

class KitchenSinkApp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  login = (uid) => {
    
    if(!uid) {
      uid = this.myRef.current.value;
    }

    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  }
  
  render() {

    let loader = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p css={errorStyle()}>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    // if (this.props.isLoggedIn) {
    //   authRedirect = <Redirect to="/" />
    // }

    return (
      <React.Fragment>
      <div css={loginBtn()}><button onClick={() => this.login()}>Go Online</button></div>

      {/* <Global /> */}
      {/* <div >
          {authRedirect}
          {loader}
          {errorMessage}
          <div >
            {/* <div>
              <p css={subtitleStyle()}> Go online</p>
            </div> */}
            
            {/* <div css={loginBtn()}><button onClick={() => this.login()}>Go Online</button></div> */}
          {/* </div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( KitchenSinkApp );