import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useWindowDimensions } from 'react-native'
import React from 'react'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'
import PrimaryButon from '../components/ui/PrimaryButon'

type GameOverScreenProps = {
  roundsNumber: number,
  userNumber: number,
  onStartNewGame: () => void
}

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }: GameOverScreenProps) => {
  const { width, height } = useWindowDimensions()
  return (
    <View style={height < 450 ? {flex: 1, marginTop: 12, alignItems: 'center' } : styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={[height < 450 ? styles.containerHorizontal : { alignItems: 'center'}  ]}>
        <View style={height < 450 ? [styles.imageContainer] : styles.imageContainer}>
          <Image source={require('../assets/images/success.png')} style={ styles.image} />
        </View>
        <View style={height < 450 && {flex: 2, alignItems: 'center'} }>
          <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text> correctly </Text>
          <PrimaryButon onPress={onStartNewGame}>Start New Game</PrimaryButon>
        </View>
      </View>
    </View>
  )
}

export default GameOverScreen

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
   
    
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: deviceWidth < 380 ? 16 : 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  },
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

})