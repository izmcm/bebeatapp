import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import SoundPlayer from 'react-native-sound-player'

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

export default class CardRecord extends Component {
  playSong() {
    try {
        SoundPlayer.play()
    } catch (e) {
        console.log(`error:`, e)
    }
  }  

  pauseSong() {
    try {
        SoundPlayer.pause()
    } catch (e) {
        console.log(`error:`, e)
    }
  }  
  
  componentDidMount(){
    SoundPlayer.loadSoundFile('cilada', 'mp3')
  }

  render() {
    return (
      <>
        <Card>
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
        marginRight: 10
    },
    musicName: {
        textAlign: "left",
        fontSize: 20,
        paddingBottom: 20,
    },
});

