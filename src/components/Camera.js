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
import axios from 'axios';

// API KEY
const cloudVisionKey = 'AIzaSyCg9QELuaeSftow2xQdPOjbMIrOPgvhA8w';

// Endpoint
const cloudVision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

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
    //TODO: Config states --> States are essentailly like variables within the class
    // They are set up like dictionaries or JSON data (kinda)
    //
    this.state = {
      captureText: null, //What we will use to handle text
      flag: false, // This is just test data but will probably need a boolean flag
    }

    //TODO: Some functions that effect state (I think) will need to be binded here
    // Something like this -->
    this.setTextContent = this.setTextContent.bind(this);

  }

  static navigationOptions = {
    title: 'Camera'
  };

//TODO: functions like these will probably be needed
// setTextContent essentailly sets the state of the captureText
// toggleLoader is a funtions that could be used for a loading screen via react-native-loading-spinner-overlay

  setTextContent(textContent) {
    //this.toggleLoader();
    this.setState({captureText: textContent});
  }
  //This would be a loading screen
  // toggleLoader() {
  //   this.setState({
  //     showLoader: !this.state.showLoader
  //   })
  // }

  //TODO: After a photo is taken the screen should be sent to an edit page of the last photo
  //      The vision api should also be triggered somewhere along the way
  //https://github.com/DjordjePetrovic/react-native-camera-translator

  takePicture() {
    let self = this;
    //this.toggleLoader();
    this.camera.capture()
      .then((pic) => {
        axios.post(cloudVision, {
        "requests":[
          {
            "image":{
              "content": pic.data
            },
            "features":[
              {
                "type":"TEXT_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      })
      .then(function (response) {
        let textAnnotations  = response.data.responses[0].textAnnotations[0],
            textContent      = textAnnotations.description;
        self.setTextContent(textContent);
        console.log(textContent);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
      })
      .catch(err => console.error(err));
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

  //TODO: Add everyting to render that is needed
  //CaptureQuality and CaptureTarget effect the picture for text conversion
  render() {
    if (this.state.showPhotoGallery) {
      return (<ViewPhotos photoArray={this.state.photoArray}/>)
    }
    return (<View style={styles.container}>
      <Camera ref={(cam) => {
          this.camera = cam;
        }} style={styles.preview} captureQuality={Camera.constants.CaptureQuality["720p"]}
        captureTarget={Camera.constants.CaptureTarget.memory} aspect={Camera.constants.Aspect.fill}></Camera>

      <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
        <Image source={require('../Img/Astley.gif')}/>
      </TouchableHighlight>

      <TouchableHighlight style={styles.cameraRoll} onPress={() => this.getPhotosFromGallery()}>
        <Image source={require('../Img/camera_roll_circle.png')}/>
      </TouchableHighlight>
    </View>);
  }

}
