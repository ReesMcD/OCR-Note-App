import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, Button, TextInput} from 'react-native';
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay';

firebase.initializeApp({
  apiKey: "AIzaSyAcjSYn8aBoMUukqkYCUZMjzNHpXlp2I8c",
  authDomain: "takepicture-b07cc.firebaseapp.com",
  databaseURL: "https://takepicture-b07cc.firebaseio.com",
  projectId: "takepicture-b07cc",
  storageBucket: "takepicture-b07cc.appspot.com",
  messagingSenderId: "393936412972"
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    fontSize: 20,
  }

});

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      data: null,
      noteAmount: null,
    }

    firebase.auth().signInAnonymously().then((user) => {
      console.log("Logged in");
      console.log(user.isAnonymous);
    });
  }

  static navigationOptions = {
    title: 'Edit Note'
  };

  back() {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  getResponse = () => {
  firebase.database().ref('notes').once('value').then((snapshot) => {
    this.setState({
      data: snapshot.val(),
      noteAmount: snapshot.val().length,  //This will have to be chanced to get the last element in the list
    });
  });
}

postNote = () => {
  var updates = {};
  var newText = this.state.text;
  updates['/notes/' + this.state.noteAmount] = newText;

  this.back()
  return firebase.database().ref().update(updates);
}

   componentDidMount() {
    this.getResponse();
    this.setState({
      text: this.props.navigation.state.params.text
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <Button
          onPress={() => {this.postNote()}}
          title="Post Note"
        />
        <TextInput style={styles.input} value={this.state.text} multiline = {true}  editable = {true}
          onChangeText={(text) => this.setState({text})} maxLength = {10000}/>

      </ScrollView>
    );
  }
}
