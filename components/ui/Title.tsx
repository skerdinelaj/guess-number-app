import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import Colors from '../../constants/colors'

type TitleProps = {
    children: ReactNode
}

const Title = ({children}: TitleProps) => {
  return (
      <Text style={styles.title}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        borderRadius: 8,
        padding: 12,
    }
})