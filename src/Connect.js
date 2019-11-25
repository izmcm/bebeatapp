import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { 
  Container, 
  Button, 
  Icon, 
  View, 
  Text, 
  H2,
} from 'native-base';
import { Header } from 'react-navigation-stack';

export default class Connect extends Component {
  constructor(props) {
    super(props);  
  }

  openRecord() {
    this.props.navigation.navigate('Gravar')
  }

  _openListen() {
    this.props.navigation.navigate('Ouvir')
  }

  componentDidMount() {
    this.props.navigation.setParams({ seeRecords: this._openListen });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Conectar',
      headerRight: <Icon style={{ marginRight:15,color:'black' }} name={'document'} size={25} onPress={() => params.seeRecords()} />
    }
  }
  
  render() {
    return (
      <>
      <Container style={styles.body}>
        <View style={styles.container}>
          <H2 style={styles.commandText}>conecte-se ao{"\n"}seu Bebeat:</H2>
        </View>

        <View style={styles.container}>
          <Button iconLeft rounded>
            <Icon name='bluetooth'/>
            <Text>conectar via bluetooth</Text>
          </Button>
        </View>

        <View style={styles.container}>
          <Button rounded light onPress={this.openRecord.bind(this)} accessibilityLabel="Próximo">
            <Text>próximo</Text>
          </Button>
        </View>
      </Container>
      </>
    );
  }
}

// Connect.navigationOptions = {
//   title: 'Conectar',
//   headerRight: <Icon style={{ marginRight:15,color:'black' }} name={'document'} size={25} onPress={this.openRecord.bind(this)} />

// }

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

