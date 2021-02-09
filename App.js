import React, { Component } from 'react';
import 'react-native-gesture-handler'; 
// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

 // Create the navigator
 const Stack = createStackNavigator();

export default class App extends React.Component {

render() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start now"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

}