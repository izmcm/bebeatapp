import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CardRecord from './CardRecord';
import { 
  Container, 
  Button, 
  Icon, 
  View, 
  Text, 
  Card, 
  CardItem,
  Body,
  H2
} from 'native-base';

export default class Listen extends Component {
  render() {
    return (
      <Container style={styles.body}>
          <H2 style={styles.commandText}>Minhas Gravações</H2>
          <CardRecord></CardRecord>
      </Container>
    );
  }
}

Listen.navigationOptions = {
  title: 'Ouvir',
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#DC8B7A",
        padding:30
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    commandText: {
        textAlign: "center",
        fontSize: 22,
        padding: 20,
        fontFamily:'Comfortaa Bold',
        color:'white'
    },
});

