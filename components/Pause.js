import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

const Pause = ({setPause, setIsPlaying, character, stopMove}) => {
    const handleResume = () => {
        setPause(false)
        stopMove.value = false
    }

    const handleExit = () => {
        setPause(false)
        setIsPlaying(false)
        stopMove.value = false
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require(`../assets/planets/${character}.png`)}
            />

            <Text style={styles.title}>GAME PAUSED</Text>

            <Pressable onPress={handleResume} style={styles.button}>
                <Text style={styles.h1}>RESUME</Text>
            </Pressable>
            <Pressable onPress={handleExit}>
                <Text style={styles.h1}>EXIT</Text>
            </Pressable>
        </View>
    )
}

export default Pause

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        position: "absolute",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        zIndex: "20000",
        height: "100%",
        width: "100%",
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
