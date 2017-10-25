import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
//import Camera from 'react-native-camera';

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
        <Text>Welcome to TakePicture-GetText!</Text>
        <Button onPress={() => navigate('Camera')} title="Go to Camera"/>
      </View>
    );
  }
}
