import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import HoverButton from './HoverButton'

const GameOver = ({setGameOver, setIsPlaying, character}) => {
    const handleReplay = () => {
        setGameOver(false)
        setIsPlaying(true)
    }
    const handleExit = () => {
        setGameOver(false)
        setIsPlaying(false)
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require(`../assets/planets/${character}.png`)}
            />

            <Text style={styles.title}>YOU FELL!</Text>

            <HoverButton 
                text="PLAY AGAIN"
                onPressFunc={handleReplay}
            />
            <Pressable onPress={handleExit}>
                <Text style={styles.h1}>EXIT</Text>
            </Pressable>
        </View>
    )
}

export default GameOver

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        position: "absolute",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "400px",
        width: "400px",
        marginBottom: "20px"
    },
    
    title: {
        color: "#fff",
        fontSize: "48px",
        marginTop: "20px"
    },
    p: {
        color: "#fff",
        fontSize: "14px"
    },
    h1: {
        color: "#fff",
        fontSize: "24px"
    },
    button: {
        borderWidth: "2px",
        borderColor: "#fff",
        paddingHorizontal: "8px",
        paddingVertical: "4px",
        marginTop: "20px",
        marginBottom: '20px'
    }
})
