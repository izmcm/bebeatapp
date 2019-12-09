import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid
} from 'react-native';
import { 
  Container, 
  Icon, 
  Button,
  Text,
  View,
  H2,
  H1
} from 'native-base';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'

/* instruções de funcionamento do app:
- Ao ativar o bluetooth, estarão listados todos os dipositivos já pareados com o android.
- Para procurar dispositivos por perto, mas não pareados aperte em scan for devices e espere um pouco.
- Para conectar a um dispositivo (pareado ou não), basta tocar no seu nome na lista.
*/

export default class App extends Component{
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      debugador:'',
      audioStream: [],
      dataSending: {
        turnOnLed: "1",
        startRecording: "2",
        stopRecording: "3"
      },
    }
  }
  UNSAFE_componentWillMount(){

    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values

      this.setState({ isEnabled, devices })
    })

    BluetoothSerial.on('bluetoothEnabled', () => {

      Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ])
      .then((values) => {
        const [ isEnabled, devices ] = values
        this.setState({  devices })
      })

      BluetoothSerial.on('bluetoothDisabled', () => {

         this.setState({ devices: [] })

      })
      BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

    })
  }
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);
      
      ToastAndroid.show(`Connected to device ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }
  _renderItem(item){

    return(<TouchableOpacity onPress={() => this.connect(item.item)}>
            <View style={styles.deviceNameWrap}>
              <Text style={styles.deviceName}>{ item.item.name ? item.item.name : item.item.id }</Text>
            </View>
          </TouchableOpacity>)
  }
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }
  discoverAvailableDevices () {
    try{
      console.log('Clicked!!!!')
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      .then(result => {
        if (!result) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        }else{
          if (this.state.discovering) {
            return false
          } else {
            this.setState({ discovering: true })
            BluetoothSerial.discoverUnpairedDevices()
            .then((unpairedDevices) => {
              const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
              let dispositivos = this.state.devices;
              dispositivos = dispositivos.concat(uniqueDevices);
  
              this.setState({ devices:dispositivos, unpairedDevices: uniqueDevices, discovering: false })
            })
          }
        }
      });
    } catch (error) {
      console.log(err.message)
    }
    
  }

  render() {

    return (
      <Container style={styles.container}>
        <View style={styles.toolbar}>
              <H1 style={styles.toolbarTitle}>{this.state.debugador} Listar os dispositivos {'\n'} pareados</H1>
              <View style={styles.toolbarButton}>
                <Switch
                  value={this.state.isEnabled}
                  onValueChange={(val) => this.toggleBluetooth(val)}
                />
              </View>
        </View>
        
        {this.state.isEnabled?
        <FlatList
        style={{flex:1}}
        data={this.state.devices}
        keyExtractor={item => item.id}
        renderItem={(item) => this._renderItem(item)}
        />:null }

        <View style={styles.bottomButtonWrapper}>
          <Button
            onPress={this.discoverAvailableDevices.bind(this)}
            rounded light
            style={styles.listOthersButton}
          >
            <Text style={{textAlign:'center', fontFamily:'Comfortaa'}}>Buscar outros dispositivos</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE6A0',
    justifyContent:'space-between',
    paddingTop: 20,
    paddingBottom:20,
    paddingLeft:5,
    paddingRight:5
  },
  toolbar:{
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row',
    borderColor:'black',
    borderWidth:0,
    borderRadius:10,
    elevation:30
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
  toolbarTitle:{
    textAlign:'center',
    fontFamily:'Comfortaa SemiBold',
    fontSize: 20,
    flex:1,
    marginTop:6,
    lineHeight:20
  },
  deviceName: {
    fontSize: 17,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth:1
  },
  listOthersButton:{
    width:240,
    backgroundColor: '#FCE6A0',
    borderColor:'black',
    borderWidth:1,
  },
  bottomButtonWrapper: {
    display:'flex',
    justifyContent:'center',
    flexDirection:"row"
  }
});