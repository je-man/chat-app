import React from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { View, Platform, KeyboardAvoidingView, Text, StyleSheet } from "react-native";

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  
      messages: [],
    }; 
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

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
    let { userName, backgroundColor } = this.props.route.params; this.props.navigation.setOptions({ title: userName });
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
 
 
