
/** @jsx jsx */
import { jsx } from '@emotion/react';

import HomePage from '../../CometChat/defaultPages/HomePage';


import { useAuth0 } from '@auth0/auth0-react';
import {
    wrapperStyle
} from "../styles/CometChatAppStyle";
import {CometChat} from '@cometchat-pro/chat';

function CometChatApp(){
    const {
        user,
      } = useAuth0();
    if(user){
        var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
        CometChat.login(userId,'d8dee6a22683724af8502b02929f601f6f30f43c')
        .then( user => {
        console.log("Login successfully:", { user });
    })
    }
    if(user){
    let GUID = "theatermanagers";
    var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
    let membersList = [
    new CometChat.GroupMember(userId, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
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