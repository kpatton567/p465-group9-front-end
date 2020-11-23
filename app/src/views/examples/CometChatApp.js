import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

/** @jsx jsx */
import { jsx } from '@emotion/react';

import PrivateRoute from '../../CometChat/PrivateRoute';

import KitchenSinkApp from '../../CometChat/defaultPages/KitchenSinkApp';
import HomePage from '../../CometChat/defaultPages/HomePage';


import { useAuth0 } from '@auth0/auth0-react';
import {
    wrapperStyle
} from "../styles/CometChatAppStyle";
import {CometChat} from '@cometchat-pro/chat';

const history = createBrowserHistory();

function CometChatApp(){
    const {
        user,
      } = useAuth0();
    if(user){
        CometChat.login(user.sub.substring(6),'d8dee6a22683724af8502b02929f601f6f30f43c')
        .then( user => {
        console.log("Login successfully:", { user });
    })
    }
    if(user){
    let GUID = "theatermanagers";
    let membersList = [
    new CometChat.GroupMember(user.sub.substring(6), CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
    ];

    CometChat.addMembersToGroup(GUID, membersList, []).then(
    response => {
        console.log("response", response);
    },
    error => {
        console.log("Something went wrong", error);
    }
    );
    }
    
    return (
        <div css={wrapperStyle()}>
            <HomePage/>
        </div>
    );
}

export default (CometChatApp);