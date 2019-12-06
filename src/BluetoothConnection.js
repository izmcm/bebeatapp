import React, { Component } from 'react';
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
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'

/* instruções de funcionamento do app:
- Ao ativar o bluetooth, estarão listados todos os dipositivos já pareados com o android.
- Para procurar dispositivos por perto, mas não pareados aperte em scan for devices e espere um pouco.
- Para conectar a um dispositivo (pareado ou não), basta tocar no seu nome na lista.
*/

export default class App extends Component<{}> {
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
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
  }

  stopRecording(){
    BluetoothSerial.write(this.state.dataSending.stopRecording)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device stop recording')
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
  }

  render() {

    return (
      <View style={styles.container}>
      <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>{this.state.debugador} Bluetooth Device List</Text>
            <View style={styles.toolbarButton}>
              <Switch
                value={this.state.isEnabled}
                onValueChange={(val) => this.toggleBluetooth(val)}
              />
            </View>
      </View>
        <Button
          onPress={this.discoverAvailableDevices.bind(this)}
          title="Scan for Devices"
          color="#841584"
        />
        {this.state.isEnabled?
        <FlatList
        style={{flex:1}}
        data={this.state.devices}
        keyExtractor={item => item.id}
        renderItem={(item) => this._renderItem(item)}
        />:null }
        
        <Button
          onPress={() => this.turnOnLed()}
          title="Ligar LED"
          color="#841584"
        />

        <Button
          onPress={() => this.startRecording()}
          title="Iniciar Gravação"
          color="#F0F"
        />

        <Button
          onPress={() => this.stopRecording()}
          title="Parar Gravação"
          color="#000"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    paddingTop:30,
    paddingBottom:30,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
  toolbarTitle:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    flex:1,
    marginTop:6
  },
  deviceName: {
    fontSize: 17,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth:1
  }
});