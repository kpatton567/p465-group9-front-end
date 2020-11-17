import React, {Component} from 'react';
import {Widget, addResponseMessage, addUserMessage, dropMessages, toggleMsgLoader} from 'react-chat-widget';
import {CometChat} from '@cometchat-pro/chat';
import 'react-chat-widget/lib/styles.css';

const agentUID = '5f8aefe6edc64a00681ecafa';
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const limit = 30;
class Client extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to our theater!');
    addResponseMessage('Are you looking for anything in particular?');
    
    let uid = localStorage.getItem("cc-uid");
    // check for uid, if exist then get auth token, login, create message listener and fetch previous messages
   if ( uid !== null) {
     this.fetchAuthToken(uid).then(
       result => {
         console.log('auth token fetched', result);
         CometChat.login('5f7f79850046a0006e76cab4','d8dee6a22683724af8502b02929f601f6f30f43c')
         .then( user => {
           console.log("Login successfully:", { user });
           this.createMessageListener();
        })
       },
       error => {
         console.log('Initialization failed with error:', error);
       }
     );
   }
  }

  fetchAuthToken = async uid => {
    fetch("https://api-us.cometchat.io/v2.0/users/5f7f79850046a0006e76cab4/auth_tokens", {
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
    var user = new CometChat.User('5f7f79850046a0006e76cab4');
    user.name = "Pranamya"
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
      if(CUSTOMER_MESSAGE_LISTENER_KEY != agentUID){
    CometChat.addMessageListener(
      CUSTOMER_MESSAGE_LISTENER_KEY,
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          console.log("Incoming Message Log", { message });
          if(message.sender.uid != '5f7f79850046a0006e76cab4')
            addResponseMessage(message.text);
        }
      })
    );}
  }

  fetchPreviousMessages = () => {
    var messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(agentUID)
    .setLimit(limit)
    .build();   

    messagesRequest.fetchPrevious().then(
      messages => {
        console.log("Message list fetched:", messages);
        messages.forEach( message => {
          if(message.receiver !== agentUID){
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

  handleNewUserMessage = newMessage => {
    // console.log(`New message incoming! ${newMessage}`);
    let uid = localStorage.getItem("cc-uid");
    toggleMsgLoader();
    if (uid === null) {
      this.createUser().then(
        result => {
          console.log('auth token fetched', result);
          localStorage.setItem("cc-uid",result.uid)
          CometChat.login('5f7f79850046a0006e76cab4','d8dee6a22683724af8502b02929f601f6f30f43c')
          .then(user => {
            console.log("Login successfully:", { user });
            fetch("https://api-us.cometchat.io/v2.0/users/5f7f79850046a0006e76cab4/messages", {
            "method": "POST",
            "headers": {
                "appId": "254719f4f395024",
                "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": "{\"category\":\"message\",\"type\":\"text\",\"data\":{\"text\":\""+newMessage+"\",\"metadata\":{\"key1\":\"value1\",\"key2\":\"value2\"}},\"multipleReceivers\":{\"uids\":[\""+agentUID+"\",\"uid2\"],\"guids\":[\"\"]}}"
            }).then(
                message => {
                    console.log('Message sent successfully:', message);
                },
                error => {
                    console.log('Message sending failed with error:', error);
                }
            )
          })
      },
      error => {
        console.log('Initialization failed with error:', error);
      })
    } else {
      // we have uid, do send
    fetch("https://api-us.cometchat.io/v2.0/users/5f7f79850046a0006e76cab4/messages", {
            "method": "POST",
            "headers": {
                "appId": "254719f4f395024",
                "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": "{\"category\":\"message\",\"type\":\"text\",\"data\":{\"text\":\""+newMessage+"\",\"metadata\":{\"key1\":\"value1\",\"key2\":\"value2\"}},\"multipleReceivers\":{\"uids\":[\""+agentUID+"\",\"uid2\"],\"guids\":[\"\"]}}"
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
          title='Chat with Theater Agent'
          subtitle='Ready to help you'
        />
      </div>
    );
  }
}

export default Client;