import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

export class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Camera
//            ref={(cam) => {
//              this.camera = cam;
//            }}
//            style={styles.preview}
//            aspect={Camera.constants.Aspect.fill}>
//            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
//        </Camera>
//       </View>
//     );
//   }
//
//   takePicture() {
//    this.camera.capture()
//      .then((data) => console.log(data))
//      .catch(err => console.error(err));
//  }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
