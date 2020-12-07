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
        <div css={wrapperStyle()} style={{maxWidth: '24rem' , marginTop : '7rem' }}>
         
          <div css={componentStyle()}>
            <div css={boxStyle()}>
              <div css={titleWrapperStyle()}>
                <i class="nc-icon nc-chat-33" style = {{fontSize: '32px'}}/>
                <h2 css={componentTitleStyle()}>Chat now</h2>
              </div>
              <div css={descWrapperStyle()}>
                <p>Provide Customer Support to your theater customers</p>
                <p>Enter into groups with other theater managers, discuss theaters, pricing and a lot more!</p>
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