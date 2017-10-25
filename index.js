import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import {StackNavigator, addNavigationHelpers} from 'react-navigation'
import Routes from "./src/config/Routes";

const Navigator = StackNavigator(Routes, {
  //headerMode: 'none' // if you dont want a top header
})

class AppContainer extends Component {
  render() {
    return (<Navigator/>)
  }
}

AppRegistry.registerComponent('TakePicture', () => AppContainer);

// May be needed later
// <Navigator
//     navigation={addNavigationHelpers({
//         dispatch: this.props.dispatch,
//         state: this.props.nav
//     })}
// />
