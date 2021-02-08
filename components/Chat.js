import React from "react";
import { View, Text } from "react-native";

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  }; 
  }


  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.navigation.state.params.colorBackground,
        }}
      >
        <Text>Chat Box</Text>
      </View>
    );
  }
}
