import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { 
  Container, 
  Icon, 
  Button,
  Text,
  View,
  H2
} from 'native-base';

export default class Connect extends Component {
  constructor(props) {
    super(props);  
  }

  openRecord() {
    this.props.navigation.navigate('Gravar')
  }

  openListen() {
    this.props.navigation.navigate('Ouvir')
  }

  openBluetoothConnection() {
    this.props.navigation.navigate('BluetoothConnection')
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Conectar'
    }
  }
  
  render() {
    return (
      <>
      <Container style={styles.body}>
        <View style={styles.container}>
          <H2 style={styles.commandText}>Conecte-se ao{"\n"}seu Bebeat:</H2>
        </View>

        <View style={styles.container}>
          <Button iconLeft rounded onPress={() => this.openBluetoothConnection()}>
            <Icon name='bluetooth'/>
            <Text>conectar via bluetooth</Text>
          </Button>
        </View>

        <View style={styles.container}>
          <Button rounded light onPress={this.openRecord.bind(this)} accessibilityLabel="Próximo">
            <Text>próximo</Text>
          </Button>
        </View>

        <View style={styles.container}>
          <Button block onPress={this.openListen.bind(this)} accessibilityLabel="Gravações">
            <Text>Gravações</Text>
          </Button>
        </View>
      </Container>
      </>
    );
  }
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
    listenBtn: {
      flex: 0,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      padding: 10
    },
    commandText: {
        textAlign: "center",
        fontSize: 25,
    },
});
