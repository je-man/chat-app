// import React from 'react';
// import { View, Text, Button, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';

// // Array of background colors with HEX codes to choose from
// const backgroundColorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];


// export default class Screen1 extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = { userName: '',
//     // Setting a default background color in case the user doesn't select one
//     color: '',
//    };
//   }

//   render() {
//     return (
//       <ImageBackground source={require('../img/BackgroundImage.png')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text style={styles.appTitle}>Talk'n Chat</Text>
//         <View style={styles.box}>
//           <View style={styles.inputStyle}>
//             <Image style={styles.iconStyle} source={require('../img/userProfile.png')}></Image>
//             <TextInput style={{flex: 1}}
//               accessible={true}
//               accessibilityLabel='Input name'
//               onChangeText={(name) => this.setState({name})}
//               value={this.state.name}
//               placeholder='Your Name'
//            />
//           </View>
//           <Text>Choose Background Color</Text>
//           <View style={styles.backgroundColor}>
//              <TouchableOpacity
//                 // Changing the background color - position: 0 from the array defined above
//                 onPress={() => this.setState({ color: "#090C08" })}
//                 // Displaying the color (circle) itself
//                 style={[styles.color1, styles.colorButton]}
//               />

//               <TouchableOpacity
//                 // Changing the background color - position: 1 from the array defined above
//                 onPress={() => this.setState({ color: backgroundColorOptions[1] })}
//                 // Displaying the color (circle) itself
//                 style={[styles.color2, styles.colorButton]}
//               />

//               <TouchableOpacity
//                 // Changing the background color - position: 2 from the array defined above
//                 onPress={() => this.setState({ color: backgroundColorOptions[2] })}
//                 // Displaying the color (circle) itself
//                 style={[styles.color3, styles.colorButton]}
//               />

//               <TouchableOpacity
//                 // Changing the background color - position: 3 from the array defined above
//                 onPress={() => this.setState({color: backgroundColorOptions[3] })}
//                 // Displaying the color (circle) itself
//                 style={[styles.color4, styles.colorButton]}
//               />
//           </View>
//           <Button
//             style={styles.button}
//             title="Start Chatting"
//             onPress={() =>
//               this.props.navigation.navigate("Chat", {
//                 userName: this.state.userName,
//                 color: this.state.color,
//               })
//             }
//           />
//         </View>
//       </ImageBackground>
//     )
//   }
// }

// const styles = StyleSheet.create({
//  appTitle: {
//    fontSize: 50,
//    fontWeight: 'bold',
//    color: 'white',
//  },

//  box: {
//    marginTop: 200,
//    width: '90%',
//    height: '40%',
//    padding: 10,
//    backgroundColor: 'white'
//  },

//  inputStyle: {
//   flexDirection: 'row',
//   backgroundColor: '#fff',
//   borderWidth: .8,
//   borderColor: '#000',
//   height: 40,
//   borderRadius: 8 ,
//   margin: 15
//  },

//  startButton: {
//   height: 65,
//   width: "88%",
//   marginBottom: 20,
//   textAlign: "center",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#757083",
//  },

//  iconStyle: {
//    padding: 10,
//    margin: 5,
//    height: 18,
//    width: 20,
//    resizeMode: 'stretch',
//    alignItems: 'center'
//  },

//  backgroundColor: {
//   flex: 4,
//   flexDirection: 'row',
//   alignSelf: 'flex-start',
//   width: '80%',
//   justifyContent: 'space-around',
//   paddingLeft: 16,
//   marginTop: '2%',
// },


 
// // colorSelector: {
// //   position: 'relative',
// //   height: 40,
// //   width: 40,
// //   borderRadius: 50,
// //   margin: 2,
// //   borderColor: 'white',
// // },

// colorButton: {
//   height: 50,
//   width: 50,
//   borderRadius: 25,
//   margin: 10,
// },

// color1: {
//   backgroundColor: "#090C08",
// },
// color2: {
//   backgroundColor: "#474056",
// },
// color3: {
//   backgroundColor: "#8A95A5",
// },
// color4: {
//   backgroundColor: "#B9C6AE",
// },

// });

import React, { Component } from "react";
// import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", color: "" }; // creates state for"name" and "color"
  }
  render() {
    return (
      <ImageBackground
        source={require("../img/BackgroundImage.png")}
        style={styles.backgroundImage}
      >
        <Text style={styles.appTitle}>Mad Chatter</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.nameBox}
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
            placeholder="Enter Name"
            placeholderTextColor={"black"}
          />
          <Text style={styles.title}>Choose your background colour:</Text>
          <View style={styles.colorBackground}>
            <TouchableOpacity onPress={()=> { this.setState({ color: '#090C08' }) }}>
                <View style={[styles.color1, styles.colorButton]} >
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.setState({ color: "#090C08" })}
              style={[styles.color1, styles.colorButton]}
            /> */}
            <TouchableOpacity
              onPress={() => this.setState({ color: "#474056" })}
              style={[styles.color2, styles.colorButton]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: "#8A95A5" })}
              style={[styles.color3, styles.colorButton]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: "#B9C6AE" })}
              style={[styles.color4, styles.colorButton]}
            />
          </View>
          <Button
              onPress={() => {
                this.props.navigation.navigate('Chat', { userName: this.state.userName, backgroundColor: this.state.color });
              }}
              title="Start Chatting"
              color = '#757083'
              style={styles.button}
            />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "88%",
    fontSize: 16,
    height: "44%",
    color: "#000",
    marginBottom: 20,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  nameBox: {
    fontSize: 22,
    fontWeight: "800",
    borderWidth: 4,
    color: "#000000",
    borderColor: "#757083",
    width: "88%",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    backgroundColor: "white",
  },
  button: {
    height: 65,
    width: "88%",
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757083",
  },
  appTitle: {
    flex: 1,
    fontSize: 45,
    marginTop: 60,
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginTop: 15,
    marginLeft: 20,
  },
  title: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  /*========Background Color Options========*/
  colorButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
  },
  colorBackground: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 15,
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
});