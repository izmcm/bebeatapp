import React, {Component} from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';
import WaveFile from 'wavefile';

const RNFS = require('react-native-fs');

export default class LiveRecord extends Component{

  constructor(props){
    super(props);

    this.state={
      dataSending: {
        turnOnLed: "1",
        startRecording: "2",
        stopRecording: "3"
      },
      audioStream: []
    }
  }

  componentWillMount(){
    BluetoothSerial.withDelimiter('\n').then((res)=>{
      console.log("delimiter setup",res);
      BluetoothSerial.on('read',(data)=>{
        this.setState({audioStream: this.state.audioStream.concat(parseInt(data.data))})
        if(this.state.audioStream.length % 100 == 0){
          console.log(this.state.audioStream)
        }
      })
    })
  }

  turnOnLed(){
    BluetoothSerial.write(this.state.dataSending.turnOnLed)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device turn on led')
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
  }

  startRecording(){
    BluetoothSerial.write(this.state.dataSending.startRecording)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device start recording')
      this.setState({ connected: true, audioStream: []})
    })
    .catch((err) => console.log(err.message))
  }

  stopRecording(){
    BluetoothSerial.write(this.state.dataSending.stopRecording)
    .then(async (res) => {
      console.log(res);
      console.log('Successfuly wrote to device stop recording')
      this.setState({ connected: true })
      await this.createFile();
    })
    .catch((err) => console.log(err.message))
  }

  async createFile(){
    try{
      let path = RNFS.DocumentDirectoryPath + 'test.wav';    
      const resposta = await fetch('https://us-central1-bebeat-7843c.cloudfunctions.net/rawToWav', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawAudio: this.state.audioStream,
        }),
      });
      const base64 = await resposta.json()
      console.log(base64)
      const success = await RNFS.writeFile(path, base64, 'base64')
      console.log('FILE WRITTEN!');
    } catch(error){
        console.log('An error occurred: ', error)
      } 
  }

  render(){
    return(
      <>
      <Button title="Gravando"/>
      <Button title="turnOnLed" color="red" onPress={() => this.turnOnLed()}/>
      <Button title="startRecording" onPress={() => this.startRecording()}/>
      <Button title="stopRecording" onPress={() => this.stopRecording()}/>
      </>
    );
  }
}