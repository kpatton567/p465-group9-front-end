import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Avatar } from '../../../CometChat';
import { COMETCHAT_CONSTANTS } from '../../../consts';

import * as actions from '../../../store/action';

import {
  wrapperStyle,
  componentStyle,
  boxStyle,
  titleWrapperStyle,
  thumbnailWrapperStyle,
  componentTitleStyle,
  descWrapperStyle,
  linkWrapperStyle,
  linkStyle,
} from "./style";


class HomePage extends React.Component {


  login = (uid) => {
        
    if(!uid) {
      uid = this.myRef.current.value;
    }

    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
    this.setState({ isLoggedin: true })
  }

  render() {
    return (
        <div css={wrapperStyle()} style={{marginTop : '20rem'}}>
         
          <div css={componentStyle()}>

            <div css={boxStyle()}>
              <div css={titleWrapperStyle()}>
                <div css={thumbnailWrapperStyle}>
                  <Avatar image='https://data-us.cometchat.io/assets/images/avatars/cyclops.png' />
                </div>
                <h2 css={componentTitleStyle()}>Chat now</h2>
              </div>
              <div css={descWrapperStyle()}>
                <p>Group chat with other theater managers</p>
              </div>
              <ul css={linkWrapperStyle()}>
                <li><Link css={linkStyle()} to="/groupchat/embedded-app" target="_blank" >Go Online</Link></li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect(mapStateToProps , mapDispatchToProps)(HomePage);