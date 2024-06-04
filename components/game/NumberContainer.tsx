import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode }  from 'react'
import Colors from '../../constants/colors'
import { Dimensions } from 'react-native'

type NumberContainerProps = {
    children: ReactNode
}

const NumberContainer = ({children}: NumberContainerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        fontFamily: 'open-sans-bold',
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontWeight: 'bold',
        color: Colors.accent500
    }
})