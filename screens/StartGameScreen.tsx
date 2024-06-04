import { Alert, StyleSheet, TextInput, View, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
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

    const { width, height } = useWindowDimensions()

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

    const marginTopDistance = height < 450 ? 30 : 100


    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
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
