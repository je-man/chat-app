import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';


export default class CustomActions extends React.Component {

  constructor() {
    super()
  }

  //pick a photo(s) from your gallery
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
            });
        } catch (err) {
            console.log(err);
        }

        if (!result.cancelled) {
            try {
                const imageUrlLink = await this.uploadImage(result.uri);
                this.props.onSend({image: imageUrlLink});
            } catch (err) {
                console.log(err);
            }
        }
    }
 }
  
  //take a photo(s) using camera
  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

    if (status === 'granted') {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
            });
        } catch (err) {
            console.log(err);
        }

        if (!result.cancelled) {
            try {
                const imageUrlLink = await this.uploadImage(result.uri);
                this.props.onSend({ image: imageUrlLink });
            } catch (err) {
                console.log(err);
            }
        }
    }
  }

  //retrieve user's location or view user's current location
  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
        try {
            const result = await Location.getCurrentPositionAsync({});
            if (result) {
                this.props.onSend({
                    location: {
                        longitude: result.coords.longitude,
                        latitude: result.coords.latitude,
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
  }

  // uploading image to the cloud
  uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (() => {
            resolve(xhr.response);
        });
        xhr.onerror = ((e) => {
            console.log(e);
            reject(new TypeError('NETWORK REQUEST FAILED'));
        });
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const getImageName = uri.split('/');
    const imageArrayLength = getImageName.length - 1;
    const ref = firebase.storage().ref().child(getImageName[imageArrayLength]);
    console.log(ref, getImageName[imageArrayLength]);
    const snapshot = await ref.put(blob);

    blob.close();

    // spitting out image url
    const imageURL = await snapshot.ref.getDownloadURL();
    return imageURL;
 }


  onActionPress = () => {
    const options = ['Choose From Library', 'Take picture', 'Share your location', 'Cancel']
    const cancelButtonIndex = options.length - 1;

    this.context.actionSheet().showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
        },
        async (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    this.pickImage()
                    return;
                case 1: 
                    this.takePhoto()
                    return;
                case 2: 
                    this.getLocation()
                    return;
            }
        },
    );
  };

  
  render(){
      return(
          <TouchableOpacity 
              style={[styles.container]}
              onPress={this.onActionPress}
          >
              <View style={[styles.wrapper, this.props.wrapperStyle]}>
                  <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
              </View>
          </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
});


CustomActions.contextTypes = {
actionSheet: PropTypes.func,
};



