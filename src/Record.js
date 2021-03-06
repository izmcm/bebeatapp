import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { 
  Container, 
  Icon, 
  Form, 
  Item, 
  Picker,
  Button,
  Text,
  View,
  H2
} from 'native-base';

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstrument: undefined
    };
  }

  onValueChange2(value) {
    this.setState({
      selectedInstrument: value
    });
  }

  openDrawer() {
    this.props.navigation.navigate('Conectar', { yourArray: this.state.selectedInstrument })
  }

  goToLiveRecord(){
    this.props.navigation.navigate('LiveRecord');
  }
  
  render() {
    return (
      <Container style={styles.body}>
        <View style={styles.container}>
          <H2 style={styles.commandText}>Escolha o{"\n"}instrumento</H2>
        </View>

        <Form style={styles.container}>
          <Item picker style={styles.pickerStyle}> 
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Instrumento"
              placeholderStyle={{ color: "#03195F" }}
              selectedValue={this.state.selectedInstrument}
              onValueChange={this.onValueChange2.bind(this)}
              itemStyle={{ borderColor:'#D7806D'}}
            >
              <Picker.Item label="Guitarra" value="guitarra" />
              <Picker.Item label="Violão" value="violao" />
              <Picker.Item label="Teclado" value="teclado" />
            </Picker>
          </Item>
        </Form>

        <View style={styles.container}>
          <Button style={styles.startButton} light rounded onPress={() => this.goToLiveRecord()} accessibilityLabel="Iniciar gravação">
            <Text style={{textAlign:'center'}}>Iniciar gravação</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

Record.navigationOptions = {
  title: "Gravar"
};

const styles = StyleSheet.create({
  body: {
      backgroundColor: "#FCE6A0",
  },
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 50
  },
  startButton: {
    backgroundColor:'#FCE6A0',
    borderWidth: 1,
    borderColor: 'black',
  },
  pickerStyle: {
    borderColor: "#03195F",
    borderWidth: 1
  },
  commandText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily:'Comfortaa SemiBold',
    color:'black'
  },
});