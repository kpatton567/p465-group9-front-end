import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Avatar } from '../../CometChat';

import {
  wrapperStyle,
  titleStyle,
  subTitleStyle,
  helpTextStyle,
  componentStyle,
  boxStyle,
  titleWrapperStyle,
  thumbnailWrapperStyle,
  componentTitleStyle,
  descWrapperStyle,
  linkWrapperStyle,
  linkStyle,
  logoutBtn
} from "CometChat/defaultPages/HomePage/style.js";


class ContactPage extends React.Component {

  render() {
    return (
        <div css={wrapperStyle()} style={{marginTop : '20rem'}}>
         
          <div css={componentStyle()}>

            <div css={boxStyle()}>
              <div css={titleWrapperStyle()}>
                <div css={thumbnailWrapperStyle}>
                  <Avatar image='https://data-us.cometchat.io/assets/images/avatars/cyclops.png' />
                </div>
                <h2 css={componentTitleStyle()}>Chat with us</h2>
              </div>
              <div css={descWrapperStyle()}>
                <p>Live Chat with a theater customer support</p>
              </div>
              <ul css={linkWrapperStyle()}>
                <li><Link css={linkStyle()} to="/client">Chat with us</Link></li>
              </ul>
            </div>
            <div css={boxStyle()}>
              <div css={titleWrapperStyle()}>
                <div css={thumbnailWrapperStyle()}>
                  <Avatar image='https://data-us.cometchat.io/assets/images/avatars/cyclops.png' />
                </div>
                <h2 css={componentTitleStyle()}>Call us</h2>
              </div>
              <div css={descWrapperStyle()}>
                <p>Questions? Call us at the below number</p>
              </div>
              <ul css={linkWrapperStyle()}>
                <li><Link css={linkStyle()}>+1(123)-456-7890</Link></li>

              </ul>
            </div>

            <div css={boxStyle()}>
              <div css={titleWrapperStyle()}>
                <div css={thumbnailWrapperStyle()}>
                  <Avatar image='https://data-us.cometchat.io/assets/images/avatars/cyclops.png' />
                </div>
                <h2 css={componentTitleStyle()}>Email us</h2>
              </div>
              <div css={descWrapperStyle()}>
                <p>Questions? Call us at the below email address</p>
              </div>
              <ul css={linkWrapperStyle()}>
                <li><Link css={linkStyle()} >customersupport@prevuebooking.com</Link></li>
              </ul>
            </div>

          </div>

          {/* <div css={logoutBtn()}><button onClick={this.props.onLogout}>Logout</button></div> */}
        </div>
    );
  }
}
export default ( ContactPage );