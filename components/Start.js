import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default class Screen1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userName: '',
    // Setting a default background color in case the user doesn't select one
    colorBackground: '',
   };
  }

  render() {
    return (
      <ImageBackground source={require('../img/BackgroundImage.png')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.appTitle}>Talk'n Chat</Text>
        <View style={styles.box}>
          <View style={styles.inputStyle}>
            <Image style={styles.iconStyle} source={require('../img/userProfile.png')}></Image>
            <TextInput
              accessible={true}
              accessibilityLabel='Input name'
              onChangeText={(userName) => this.setState({userName})}
              value={this.state.userName}
              placeholder='Your Name'
           />
          </View>
          <Text style={styles.titleChoose}>Choose Background Color</Text>
          <View style={styles.backgroundColor}>
             <TouchableOpacity
                onPress={() => this.setState({ colorBackground: "#090C08" })}
                // Displaying the color (circle) 
                style={[styles.colorButton, styles.color1]}
              />

              <TouchableOpacity
                onPress={() => this.setState({ colorBackground: "#474056" })}
                // Displaying the color (circle) 
                style={[styles.colorButton, styles.color2]}
              />

              <TouchableOpacity
                onPress={() => this.setState({ colorBackground: "#8A95A5" })}
                // Displaying the color (circle) 
                style={[styles.colorButton, styles.color3]}
              />

              <TouchableOpacity
                onPress={() => this.setState({colorBackground: "#B9C6AE" })}
                // Displaying the color (circle)
                style={[styles.colorButton, styles.color4]}
              />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Chat', {
                userName: this.state.userName,
                backgroundColor: this.state.colorBackground,
              })}
              >
              {/* Text on the button */}
              <Text style={styles.buttonText}>
                Start Chatting
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
 appTitle: {
   fontSize: 50,
   fontWeight: 'bold',
   color: 'white',
 },

 box: {
   marginTop: 280,
   width: '90%',
   height: '40%',
   padding: 10,
   backgroundColor: 'white'
 },

 inputStyle: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderWidth: .8,
  borderColor: '#000',
  height: 40,
  borderRadius: 8 ,
  margin: 15
 },

 button: {
  fontSize: 16,
  fontWeight: "600",
  color: '#FFFFFF',
  backgroundColor: '#757083',
  alignItems: 'center',
  width: '98%',
  height: '18%',
  marginBottom: '5%',
 },

 iconStyle: {
   padding: 10,
   margin: 5,
   height: 18,
   width: 20,
   resizeMode: 'stretch',
   alignItems: 'center'
 },

 backgroundColor: {
  flex: 4,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  width: '80%',
  justifyContent: 'space-around',
  paddingLeft: 16,
  marginTop: '2%',
 },

  colorButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    // marginTop: 16,
    textAlign: 'center',
    padding: 10,
  },

  color1: {
    backgroundColor: "#090C08",
  },
  color2: {
    backgroundColor: "#474056",
  },
  color3: {
    backgroundColor: "#8A95A5",
  },
  color4: {
    backgroundColor: "#B9C6AE",
  },

  titleChoose: {
    marginLeft: 20,
    fontSize: 17
  }


});

