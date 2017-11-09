import React, {Component} from 'react';
import {
  CameraRoll,
  Image,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import ViewPhotos from './ViewPhotos';

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
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -50,
    right: 150,
    left: 150,
    height: 150,
    width: 100,
    borderRadius: 90,
    marginLeft: -15,
    marginRight: 0,
    alignItems: 'center'
  },
  cameraRoll: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    height: 50,
    width: 50,
    left: 300,
    right: 100,
    borderRadius: 25
  }
});

export default class capture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  static navigationOptions = {
    title: 'Camera'
  };

//TODO: After a photo is taken the screen should be sent to an edit page of the last photo
//      The vision api should also be triggered somewhere along the way
//https://github.com/DjordjePetrovic/react-native-camera-translator
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options}).then((data) => {
      console.log(data))
    }.catch(err => console.error(err));
  }

  // This probably only works for iOS
  // TODO: Integrate Android --> Look here: https://medium.com/react-native-training/mastering-the-camera-roll-in-react-native-13b3b1963a2d
  // TODO: Rees - So I think we can actually translate the text in takePicture() above
  //but we also should be able to translate a photo already taken
  getPhotosFromGallery() {
    CameraRoll.getPhotos({first: 1}).then(res => {
      let photoArray = res.edges;
      this.setState({showPhotoGallery: true, photoArray: photoArray})
    })
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (<ViewPhotos photoArray={this.state.photoArray}/>)
    }
    return (<View style={styles.container}>
      <Camera ref={(cam) => {
          this.camera = cam;
        }} style={styles.preview} aspect={Camera.constants.Aspect.fill}></Camera>

      <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
        <Image source={require('../Img/Astley.gif')}/>
      </TouchableHighlight>

      <TouchableHighlight style={styles.cameraRoll} onPress={() => this.getPhotosFromGallery()}>
        <Image source={require('../Img/camera_roll_circle.png')}/>
      </TouchableHighlight>
    </View>);
  }

}
