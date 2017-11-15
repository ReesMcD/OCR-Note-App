import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import {TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation'
import Routes from "./src/config/Routes";



const Navigator = TabNavigator(Routes, {
  //headerMode: 'none' // if you dont want a top header
})

class AppContainer extends Component {
  render() {
    return (<Navigator navigation={this.props.navigation}/>)
  }
}

AppRegistry.registerComponent('TakePicture', () => AppContainer);
