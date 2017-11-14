import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
////import Camera from 'react-native-camera';


// RNCameraRoll.getAssets({ assetType: 'image', limit: 20 })
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Edit'
  };
  render() {
    const {navigate} = this.props.navigation;
    const {state} = this.props.navigation;
    return (
      <View>
        <Text>{state.params.name}</Text>
      </View>
    );
  }
}
