import React, {Component} from 'react';
import {
  Container,
  H2,
  H3,
  Button,
  Icon,
  Form,
  Label,
  Item,
  Input
} from 'native-base'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

export default class LiveRecord extends Component{
  constructor(props){
    super(props);
    this.state = {
      hour: 0,
      minute:0,
      didPause:false,
      didStop:false,
      recordName:''
    }
  }

  pauseOrPlayRecord() {
    if(this.state.didPause){
      this.setState({didPause:false})
      this.keepRecording()
    }else{
      this.setState({didPause:true})
    }
  }

  stopRecord(){
    this.setState({
      didPause:true,
      didStop:true
    })
  }

  keepRecording(){
    let context = this;
    let myInterval = setInterval(function(){
      if(context.state.didPause){
        clearInterval(myInterval)
        return;
      } 
      let hour;
      let minute;
      if(context.state.minute == 59){
        hour = context.state.hour + 1;
        minute = 0;
        context.setState({hour, minute})
      }else{
        minute = context.state.minute + 1;
        context.setState({minute})
      }
    },1000);
  }

  goToRecordScreen(){
    this.props.navigation.navigate('LiveRecord');
  }

  componentDidMount() {
    this.keepRecording();
  }

  saveRecord(){
    console.log('chama')
  }

  static navigationOptions = {
    title: 'Gravar Sessão'
  }
  
  render(){
    const {navigate} = this.props.navigation;
    return(
      <Container style={styles.container}>
        <View>
          <H2 style={{color:'white', fontWeight:"bold"}}>Gravando a Sessão....</H2>
        </View>

        <View>
          <H3 style={{color:'#DC8B7A', textAlign:'center'}}>{this.state.hour}:{this.state.minute < 10? `0${this.state.minute}`: this.state.minute}</H3>
          <Image 
              source={require('./assets/wavephoto.gif')}  
              style={{width: 250, height: 150 }}
          />
        </View>

        {!this.state.didStop &&
        <View style={styles.buttonWrapper}>
          <Button rounded style={styles.button} onPress={()=>{this.pauseOrPlayRecord();}}>
            <Icon style={{color:"#DC8B7A"}} type="FontAwesome" name={this.state.didPause ? 'play' : 'pause'} />
          </Button>
          <Button rounded style={styles.button} onPress={()=>{this.stopRecord();}}>
            <Icon style={{color:"#DC8B7A"}} type="FontAwesome" name="stop" />
          </Button>
        </View>
        }

        {this.state.didStop &&
        <Form>
          <Item stackedLabel>
            <Label style={{color:'#000000', marginBottom:10}}>Nome</Label>
            <Input onChangeText={(text)=>this.setState({recordName:text})} placeholder={'Nova gravação (1)'} style={styles.recordNameInput}/>
          </Item>
          <View style={styles.buttonWrapper}>
            <Button rounded style={styles.buttonAfterStop} onPress={()=>navigate('Gravar')}>
              <Text style={{color:'#DC8B7A', fontWeight:'bold'}}>CANCELAR</Text>
            </Button>
            <Button disabled={this.state.recordName.length? false : true}rounded style={styles.buttonAfterStop} onPress={()=>{this.saveRecord();}}>
              <Text style={{color:'#DC8B7A', fontWeight:'bold'}}>SALVAR</Text>
            </Button>
          </View>
        </Form>
        }
      </Container>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 50,
    
    backgroundColor: "#FCE6A0",
  },
  pickerStyle: {
    borderColor: "#03195F",
    borderWidth: 1
  },
  commandText: {
    textAlign: "center",
    fontSize: 25,
  },
  buttonWrapper: { 
    display:'flex',
    justifyContent: 'center',
    flexWrap:'nowrap',
    flexDirection:'row'
  },
  button: {
    backgroundColor:'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
    elevation:0,
    width:80,
    display:'flex',
    justifyContent:'center',
  },
  buttonAfterStop: {
    backgroundColor:'transparent',
    borderWidth:1,
    borderColor:'#DC8B7A',
    elevation:0,
    width:100,
    display:'flex',
    justifyContent:'center',
    fontSize:25,
    margin:10,
    height:35
  },
  recordNameInput: {
    backgroundColor:'rgba(255,255,255,.25)',
    borderRadius:10,
    borderColor:'#DC8B7A',
    borderWidth:1,
    color:'#DC8B7A',
    padding:3
  }
});