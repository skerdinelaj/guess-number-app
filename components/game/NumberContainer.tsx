import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode }  from 'react'
import Colors from '../../constants/colors'

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

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        fontFamily: 'open-sans-bold',
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.accent500
    }
})