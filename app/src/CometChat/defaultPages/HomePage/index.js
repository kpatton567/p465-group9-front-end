import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Avatar } from '../../../CometChat';

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
} from "./style";


class HomePage extends React.Component {

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
                <li><Link css={linkStyle()} to="/groupchat/embedded-app">Chat now</Link></li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
export default ( HomePage );