import { Alert, StyleSheet, TextInput, View } from 'react-native'
import PrimaryButon from '../components/ui/PrimaryButon'
import { useState } from 'react'
import Colors from '../constants/colors'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InsructionText from '../components/ui/InsructionText'

type StartGameScreenProps = {
    onPickedNumber: (pickedNumber: number) => void
}

const StartGameScreen = ({ onPickedNumber }: StartGameScreenProps) => {
    const [enteredNumber, setEnteredNumber] = useState<string>('')

    const numberInputHandler = (inputText: string) => {
        setEnteredNumber(inputText)
    }

    const resetInputHandler = () => {
        setEnteredNumber('')
    }

    const configInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{
                    text: 'Okay', style: 'destructive',
                    onPress: resetInputHandler
                }])
            return;
        }
        onPickedNumber(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess my number</Title>

            <Card>
                <InsructionText>Enter a number</InsructionText>
                <TextInput
                    style={styles.numberInput}
                    keyboardType='number-pad'
                    autoCapitalize='none' maxLength={2}
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={resetInputHandler}>Reset</PrimaryButon>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={configInputHandler}>Confirm</PrimaryButon>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})
