import React from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { View, Platform, KeyboardAvoidingView, Text, StyleSheet } from "react-native";

 //import Firestore database
 const firebase = require('firebase');
 require('firebase/firestore');

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  
      messages: [],
      uid: 0,
    }; 

    const firebaseConfig = {
      apiKey: "AIzaSyB20DtwwDwXNu4SRvUxYpNgiWJ2-3-D3C8",
      authDomain: "chatapp-15bd9.firebaseapp.com",
      projectId: "chatapp-15bd9",
      storageBucket: "chatapp-15bd9.appspot.com",
      messagingSenderId: "424257736492"
    }
  
    if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

  }

  componentDidMount() {
    
    // creating a references to messages collection
    this.referenceMessages = firebase.firestore().collection('messages');

    const {route, navigation} = this.props; let { userName } = route.params; navigation.setOptions({ title: userName });

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    
      //update user state with currently active user data
      this.setState({
        uid: user._id,
        messages: [],
      });

      this.unsubscribe = this.ReferenceMessages.onSnapshot(this.onCollectionUpdate)

    });
  }

  componentWillUnmount() {
     // stop listening to authentication
     this.authUnsubscribe();
     // stop listening for changes
     this.unsubscribe();

  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        image: data.image || null,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        }
      });
    });
    this.setState({
      messages,
    });
  };

  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || '',
      sent: true,
    });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }


  render() {
    let { userName, backgroundColor } = this.props.route.params; 
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor, 
        }}
      >
        <Text style={styles.chatBox}>Chat Box</Text>

        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
 chatBox: {
   color: 'white',
   fontSize: 25,
   textAlign: 'center',
   marginBottom: 150
 }
 
 });
 
 
