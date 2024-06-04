import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButon from '../components/ui/PrimaryButon'
import { Alert } from 'react-native'
import Card from '../components/ui/Card'
import InsructionText from '../components/ui/InsructionText'
import { Ionicons } from '@expo/vector-icons'
import GuessLogFile from '../components/game/GuessLogFile'

type GeneratedNumbers = {
    min: number,
    max: number,
    exclude: number
}

type StartGameScreenProps = {
    userNumber: number,
    onGameOver: (roundsNumber: number) => void
}

function generateRandomBetween({ min, max, exclude }: GeneratedNumbers) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween({ min, max, exclude });
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }: StartGameScreenProps) => {
    const initialGuess = generateRandomBetween({ min: 1, max: 100, exclude: userNumber });
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions();

    const nextGuessHandler = (direction: 'lower' | 'higher') => {
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween({ min: minBoundary, max: maxBoundary, exclude: currentGuess });
        setCurrentGuess(newRndNumber);
        setGuessRounds(guessRounds => [newRndNumber, ...guessRounds]);
    }

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
            minBoundary = 1;
            maxBoundary = 100;
        }
    }, [currentGuess, userNumber, onGameOver]);

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InsructionText style={styles.insructionText}>Higher or Lower?</InsructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='remove' size={24} color="white" /></PrimaryButon>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='add' size={24} color="white" /></PrimaryButon>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='remove' size={24} color="white" /></PrimaryButon>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButon onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='add' size={24} color="white" /></PrimaryButon>
                    </View>
                </View>
            </>
        )
    }

    return (

        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList data={guessRounds} renderItem={({ item, index }) => (
                    <GuessLogFile roundNumber={guessRounds.length - index} guess={item} />
                )} />
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    insructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})