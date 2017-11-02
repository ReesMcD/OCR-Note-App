import React, {Component} from 'react';
import {Image, TouchableHighlight,Platform, StyleSheet, Text, View} from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {

        position: 'absolute',
        bottom: 0,
        padding: 16,
        right: 10,
        left: 10,
        borderRadius: 20,
        alignItems: 'center',
}});

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  static navigationOptions = {
    title: 'Camera'
  };

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam;}}
          style={styles.preview}
           aspect={Camera.constants.Aspect.fill}
        >


        </Camera>
        <TouchableHighlight
                    style={styles.capture}
                    onPress={this.takePicture.bind(this)}>
                    <Image source={require('../Img/Astley.gif')} />
                </TouchableHighlight>
      </View>
    );
  }


}
