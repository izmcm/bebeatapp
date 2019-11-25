import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { 
  Container, 
  Button, 
  Icon, 
  View, 
  Text, 
  H2
} from 'native-base';

export default class Listen extends Component {
  openRecord() {
    this.props.navigation.navigate('Gravar')
  }

  openListen() {
    this.props.navigation.navigate('Ouvir')
  }

  render() {
    return (
      <>
      <Container style={styles.body}>
       
      </Container>
      </>
    );
  }
}

Listen.navigationOptions = {
  title: 'Ouvir',
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#FCE6A0",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    commandText: {
        textAlign: "center",
        fontSize: 25,
    },
});

