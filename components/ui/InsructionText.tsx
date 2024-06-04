import { StyleSheet, Text, TextStyle } from 'react-native'
import Colors from '../../constants/colors'
import { ReactNode } from 'react'

type InsructionTextProps = {
    children: ReactNode,
    style?: TextStyle | TextStyle[]
}

const InsructionText = ({ children, style }: InsructionTextProps) => {
  return (
    <Text style={[styles.instructionText, style]}>{children}</Text>
  )
}

export default InsructionText

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        color: Colors.accent500
    }
})