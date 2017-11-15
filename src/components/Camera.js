import React, {Component} from 'react';
import {
  Alert,
  CameraRoll,
  Image,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Camera from 'react-native-camera';
import ViewPhotos from './ViewPhotos';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

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
    height: 125,
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
    // States are set up like dictionaries or JSON data (kinda)
    this.state = {
      captureText: null, //What we will use to handle text
      flag: false, // This is just test data but will probably need a boolean flag
      showLoader: false,
    }

    //Some functions that effect state and have parameters (I think) will need to be binded here
    this.setTextContent = this.setTextContent.bind(this);

  }

  static navigationOptions = {
    // header: {
    //   visible: false,
    // }
  };

//Sets text as well as calls toggle
  setTextContent(textContent) {
    this.toggleLoader();
    this.setState({captureText: textContent});
  }

  //Toggles loading screen
  toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader
    })
  }

  //Helpful https://github.com/DjordjePetrovic/react-native-camera-translator
  takePicture() {
    let self = this;
    this.toggleLoader();
    this.camera.capture().then((pic) => {
      //POST to API to get text
      axios.post(cloudVision, {
        "requests": [
          {
            "image": {
              "content": pic.data
            },
            "features": [
              {
                "type": "TEXT_DETECTION",
                "maxResults": 1
              }
            ]
          }
        ]
      }).then((response) => {
        let textAnnotations = response.data.responses[0].textAnnotations[0],
          textContent = textAnnotations.description;

        self.setTextContent(textContent);
        //Navigates to edit screen after text is gotten
        this.props.navigation.navigate('Edit', { text: this.state.captureText })

      }).catch(function(error) {
        console.log(error, "error");
      });
    }).catch(err => console.error(err));
  }

  // This probably only works for iOS
  // TODO: Integrate Android --> Look here: https://medium.com/react-native-training/mastering-the-camera-roll-in-react-native-13b3b1963a2d
  // TODO: Rees - So I think we can actually translate the text in takePicture() above
  //but we also should be able to translate a photo already taken
  goToPhotos = () => {
    CameraRoll.getPhotos({first: 100}).then(res => {
      let photoArray = res.edges;
      //Navigates to CameraRoll passing in first 100 photos
      this.props.navigation.navigate('CamRoll', {photoArray: photoArray})
    })
  }

  //CaptureQuality and CaptureTarget effect the picture for text conversion
  render() {
    return (<View style={styles.container}>
      <Spinner visible={this.state.showLoader}/>
      <Camera ref={(cam) => {
          this.camera = cam;
        }} style={styles.preview} captureQuality={Camera.constants.CaptureQuality["720p"]} captureTarget={Camera.constants.CaptureTarget.memory} aspect={Camera.constants.Aspect.fill}></Camera>

      <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
        <Image source={require('../Img/shutter.png')}/>
      </TouchableHighlight>

      <TouchableHighlight style={styles.cameraRoll} onPress={() => {
          this.goToPhotos()
        }}>
        <Image source={require('../Img/camera_roll_circle.png')}/>
      </TouchableHighlight>

    </View>);
  }

}
