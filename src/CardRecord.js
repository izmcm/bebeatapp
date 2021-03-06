import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
const RNFS = require('react-native-fs');
 
import { 
  Container, 
  Button, 
  Icon, 
  View, 
  Text, 
  Card, 
  CardItem,
  Body,
  H2,
  ProgressBar,
} from 'native-base';

export default class CardRecord extends Component{
    playSong(){
        try{
            SoundPlayer.play()
            return true
        }catch(e){
            console.log(`error:`, e)
            return false
        }
    }  

    pauseSong(){
        try{
            SoundPlayer.pause()
        }catch(e){
            console.log(`error:`, e)
        }
    }  
  
  componentDidMount(){
    // SoundPlayer.loadSoundFile('cilada', 'mp3')
    SoundPlayer.loadUrl(RNFS.DocumentDirectoryPath + 'test.wav')
  }
  render() {
    return (
      <>
        <Card borderRadius={10}>
            <CardItem>
                <Body>
                <Text style={styles.musicName}>
                    nome da musica
                </Text>
                <View style={styles.menu}>
                    <Button style={styles.icon} rounded onPress={this.playSong.bind(this)}>
                        <Icon name='play'/>
                    </Button>
                    <Button style={styles.icon} rounded onPress={this.pauseSong.bind(this)}>
                        <Icon name='pause'/>
                    </Button>
                </View>
                </Body>
            </CardItem>
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: "row",
    },
    icon: {
        color: "#DC8B7A",
        marginRight: 10,
        backgroundColor:'#DC8B7A'
    },
    musicName: {
        textAlign: "left",
        fontSize: 20,
        paddingBottom: 20,
        color:'#DC8B7A'
    },
});