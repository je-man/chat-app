import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  }; 
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
 
 
