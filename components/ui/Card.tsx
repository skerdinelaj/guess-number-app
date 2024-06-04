import { StyleSheet, View, Dimensions } from 'react-native'
import { ReactNode} from 'react'
import Colors from '../../constants/colors'

type CardProps = {
    children: ReactNode
}

const Card = ({children}: CardProps) => {
  return (
    <View style={styles.inputContainer}>
      {children}
    </View>
  )
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        backgroundColor: Colors.primary800,
        elevation: 12,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center'
    },
})