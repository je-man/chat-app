import React from "react";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { View, Platform, KeyboardAvoidingView, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

 //import Firestore database
 const firebase = require('firebase');
 require('firebase/firestore');

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  
      messages: [],
      uid:'',
      user:{
        _id:'',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
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
    
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
        
          //update user state with currently active user data
          this.setState({
            uid: user._id,
            messages: [],
          });
    
          this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate)
        });
      } else {
        this.setState({
          isConnected: false,
        });
        
        this.getMessages();
      }
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
    }), () => {
      this.addMessages();
      this.saveMessages();
    });
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
        location: data.location || null,
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
      image: message.image || null,
      location: message.location || null,
      sent: true,
    });
  };

  getMessages = async () => {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
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

  //removes toolbar if internet is not detected
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  //a (+) button 
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //check if message contains location data
  renderCustomView (props) {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
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
        {this.state.image && (
          <Image
            source={{ uri: this.state.image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        renderCustomView={this.renderCustomView}
        renderActions={this.renderCustomActions}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        image={this.state.image}
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
 
 
