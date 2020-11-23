import React, {Component} from 'react';
import {Widget, addResponseMessage, addUserMessage, dropMessages, toggleMsgLoader, addLinkSnippet, setQuickButtons} from 'react-chat-widget';
import {CometChat} from '@cometchat-pro/chat';
import 'react-chat-widget/lib/styles.css';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import axios from "axios";

const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const limit = 30;
class Client extends Component {

  constructor(props){
    super(props);
    this.state = {
      agentUID : '',
      userId : props.userId,
      userName : props.userName
    }
  }
  componentDidMount() {
    addResponseMessage('Welcome to our customer care!');
    addResponseMessage('Choose a theater');
    let theaterButtons = []
    for (var i = 0 ; i < this.props.theaters.length ; i ++){
      theaterButtons.push
      ({
        label: this.props.theaters[i].theaterName,
        value: this.props.theaters[i].theaterId,
      })
    }
    setQuickButtons(theaterButtons)    

    let uid = localStorage.getItem("cc-uid");
    // check for uid, if exist then get auth token, login, create message listener and fetch previous messages
   if ( uid !== null) {
     this.fetchAuthToken(uid).then(
       result => {
         console.log('auth token fetched', result);
         CometChat.login(this.state.userId,'d8dee6a22683724af8502b02929f601f6f30f43c')
         .then( user => {
           console.log("Login successfully:", { user });
           this.createMessageListener();
        })
        this.createMessageListener();
       },
       error => {
         console.log('Initialization failed with error:', error);
       }
     );
   }
  }

  fetchAuthToken = async uid => {
    fetch("https://api-us.cometchat.io/v2.0/users/"+this.state.userId+"/auth_tokens", {
        "method": "POST",
        "headers": {
          "appId": "254719f4f395024",
          "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        "body": "{\"force\":false}"
      })
      .then(response => {
        console.log(response);
        return response
      })
      .catch(err => {
        console.error(err);
        return ""
      });
      
  }

  createUser = async ()=> {
    var user = new CometChat.User(this.state.userId);
    user.name = this.state.userName
    CometChat.createUser(user, '8af2ab1e74163bd038e0d0de4aa54f495812ef6e').then(
        user => {
            console.log("user created", user);
        },error => {
            console.log("error", error);
        }
    )
    if(user) return user;
  }

  createMessageListener = () => {
      if(CUSTOMER_MESSAGE_LISTENER_KEY != this.state.agentUID){
    CometChat.addMessageListener(
      CUSTOMER_MESSAGE_LISTENER_KEY,
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          console.log("Incoming Message Log", { message });
          if(message.sender.uid != this.state.userId)
            addResponseMessage(message.text);
        }
      })
    );}
  }

  fetchPreviousMessages = () => {
    var messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(this.state.agentUID)
    .setLimit(limit)
    .build();   

    messagesRequest.fetchPrevious().then(
      messages => {
        console.log("Message list fetched:", messages);
        messages.forEach( message => {
          if(message.receiver !== this.state.agentUID){
            // addResponseMessage(message.text);
          } else {
            addUserMessage(message.text)
          }
        });
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  handleQuickButtonClicked = (e) => {
    console.log(e)

    var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const body = {};
 
    axios.get(apiVariables.apiUrl +'/api/customer/theater_manager/'+ e, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
    }).then((response) => {
        if(response.status === 200){
            this.setState({agentUID : response.data.userId})
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    //set agentuid here
    
    addResponseMessage('Connecting you to ' + e);
    setQuickButtons([]);
}

  handleNewUserMessage = newMessage => {
    // console.log(`New message incoming! ${newMessage}`);
    let uid = localStorage.getItem("cc-uid");
    toggleMsgLoader();
    if (uid === null) {
      this.createUser().then(
        result => {
          console.log('auth token fetched', result);
          localStorage.setItem("cc-uid",result.uid)
          // CometChat.login(this.state.userId,'d8dee6a22683724af8502b02929f601f6f30f43c')
          // .then(user => {
          //   console.log("Login successfully:", { user });
            fetch("https://api-us.cometchat.io/v2.0/users/"+this.state.userId+"/messages", {
            "method": "POST",
            "headers": {
                "appId": "254719f4f395024",
                "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": "{\"category\":\"message\",\"type\":\"text\",\"data\":{\"text\":\""+newMessage+"\",\"metadata\":{\"key1\":\"value1\",\"key2\":\"value2\"}},\"multipleReceivers\":{\"uids\":[\""+this.state.agentUID+"\",\"uid2\"],\"guids\":[\"\"]}}"
            }).then(
                message => {
                    console.log('Message sent successfully:', message);
                },
                error => {
                    console.log('Message sending failed with error:', error);
                }
            )
          // })
      },
      error => {
        console.log('Initialization failed with error:', error);
      })
    } else {
      // we have uid, do send
    fetch("https://api-us.cometchat.io/v2.0/users/"+this.state.userId+"/messages", {
            "method": "POST",
            "headers": {
                "appId": "254719f4f395024",
                "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": "{\"category\":\"message\",\"type\":\"text\",\"data\":{\"text\":\""+newMessage+"\",\"metadata\":{\"key1\":\"value1\",\"key2\":\"value2\"}},\"multipleReceivers\":{\"uids\":[\""+this.state.agentUID+"\",\"uid2\"],\"guids\":[\"\"]}}"
            }).then(
                message => {
                    console.log('Message sent successfully:', message);
                },
                error => {
                    console.log('Message sending failed with error:', error);
                }
            )
    }
  };

  componentWillUnmount() {
    CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
    CometChat.logout();
    dropMessages();
  }

  render() {
    return (
      <div className='App'>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          title='Chat with Theater Agent'
          subtitle='Ready to help you'
        />
      </div>
    );
  }
}

export default Client;