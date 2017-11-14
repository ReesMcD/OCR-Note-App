import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

//TODO: Style Stuff here
const styles = StyleSheet.create({
  grey: {
    color: 'navy',
    fontSize: 30,
    paddingTop: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})

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
        <Text className='alive' style={styles.grey}>Welcome to TakePicture!</Text>
      </View>
    );
  }
}
