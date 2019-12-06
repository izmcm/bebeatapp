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

export default class LiveRecord extends Component{

  render(){
    return(
      <Button title="Gravando"/>
    );
  }
}