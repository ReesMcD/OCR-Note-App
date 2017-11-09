import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

//TODO: Style Stuff here
const styles = StyleSheet.create({

});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPhotoGallery: true,
      photoArray: []
    }

  }

  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Our App is alive!</Text>
        <TouchableHighlight style={styles.cameraRoll} onPress={() => this.getPhotosFromGallery()}>
          <Image source={require('../Img/camera_roll_circle.png')}/>
        </TouchableHighlight>
      </View>
    );
  }
}
