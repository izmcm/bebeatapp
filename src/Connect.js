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

  
  
  render() {
    return (
      <Container style={styles.body}>
        <View style={styles.container}>
          <H2 style={styles.title}>CONECTAR</H2>
        </View>

        <View style={styles.container}>
          <H2 style={styles.commandText}>Conecte-se ao{"\n"}seu Bebeat:</H2>
          <Button style={styles.btButton} iconLeft rounded onPress={() => this.openBluetoothConnection()}>
            <Icon style={{color:'black'}} name='bluetooth'/>
            <Text style={{color:'black'}}>conectar via bluetooth</Text>
          </Button>
        </View>

        <View style={styles.bottomButtonsWrapper}>
          <Button style={styles.bottomButton} light rounded onPress={this.openListen.bind(this)} accessibilityLabel="Gravações">
            <Text>Gravações</Text>
          </Button>
          <Button style={styles.bottomButton} rounded light onPress={this.openRecord.bind(this)} accessibilityLabel="Próximo">
            <Text>próximo</Text>
          </Button>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor:'#FCE6A0',
        padding:80
    },
    title: {
      color:'black',
      fontFamily:'Comfortaa SemiBold',
      fontSize:22
    },  
    btButton: {
      backgroundColor:'#FCE6A0',
      borderColor:'black',
      borderWidth:1
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    bottomButtonsWrapper:{
      display:'flex',
      justifyContent:'center',
      flexDirection:'row',
      alignItems:'center',
      
    },
    bottomButton:{
      margin:5,
      backgroundColor:'#FCE6A0',
      borderColor:'black',
      borderWidth:1
    },
    listenBtn: {
      flex: 0,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      padding: 10
    },
    commandText: {
        textAlign: "center",
        fontSize: 20,
        color:'#03195F',
        fontFamily:'Comfortaa Light',
        marginBottom:15,
    },
});
