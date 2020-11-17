import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

/** @jsx jsx */
import { jsx } from '@emotion/react';

import PrivateRoute from '../../CometChat/PrivateRoute';

import KitchenSinkApp from '../../CometChat/defaultPages/KitchenSinkApp';
import HomePage from '../../CometChat/defaultPages/HomePage';

import * as actions from '../../store/action';

import {
    CometChatConversationList,
    CometChatUserList,
    CometChatUnified,
    CometChatGroupList,
    CometChatUserListScreen,
    CometChatConversationListScreen,
    CometChatGroupListScreen
} from '../../CometChat';

import {
    wrapperStyle
} from "../styles/CometChatAppStyle";

const history = createBrowserHistory();

class CometChatApp extends React.Component {
    state = {
        isLoggedin: false
    }

    componentDidMount() {
        this.props.getLoggedinUser();
    }

    render() {

        return (
            <div css={wrapperStyle()}>
                <Router history={history}>
                    <Switch>
                        <Route path="/groupchat/embedded-app" component={CometChatUnified} />
                        <Route path="/groupchat/contact-list" component={CometChatUserList} />
                        <Route path="/groupchat/group-list" component={CometChatGroupList} />
                        <Route path="/groupchat/conversations-list" component={CometChatConversationList} />
                        <Route path="/groupchat/contact-screen" component={CometChatUserListScreen} />
                        <Route path="/groupchat/conversation-screen" component={CometChatConversationListScreen} />
                        <Route path="/groupchat/group-screen" component={CometChatGroupListScreen} />
                        <Route exact path="/manager/groupchat" component={HomePage} />
                        <Route path="/login" component={KitchenSinkApp} />
                    </Switch>
                </Router>
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
        getLoggedinUser: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(CometChatApp);