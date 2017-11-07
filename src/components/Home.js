import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
//import Camera from 'react-native-camera';
import RNCameraRoll from 'react-native-cameraroll';
//import Camera from 'react-native-camera';


RNCameraRoll.getAssets({ assetType: 'image', limit: 20 })
  .then(response => console.log(response))
  .catch(err => console.error(err));

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Our App is alive!</Text>
      </View>
    );
  }
}
