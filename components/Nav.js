import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import pauseImg from "../assets/planets/Pause.png"
import pauseHoverImg from "../assets/planets/Pause Hovering.png"

const Nav = ({score, setPaused, highScore}) => {
    const [hovering, setHovering] = useState(false)

    return (
        <View style={styles.container}>
            <Pressable
                onHoverIn={() => setImageSource(true)}
                onHoverOut={() => setHovering(false)}
                onPress={() => setPaused(true)}
            >
                <Image 
                    style={styles.pause}
                    source={hovering ? pauseHoverImg :
                        pauseImg 
                    }
                />
            </Pressable>
            <View style={{display: "flex", flexDirection: "row"}}>
                <View style={[styles.scoreContainer, {marginRight: "12px"}]}>
                    <Text style={styles.h1}>YOUR SCORE</Text>
                    <Text style={styles.p}>{score}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.h1}>HIGH SCORE</Text>
                    <Text style={styles.p}>{highScore}</Text>
                </View>
            </View>
        </View>
    )
}

export default Nav

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        // backgroundColor: "green",
        top: 0,
        width: "100%",
        padding: "20px",
        flexDirection: "row",
        zIndex: "1000",
        justifyContent: "space-between"
    },
    p: {
        color: "#fff",
        fontSize: "20px",
        alignSelf: "flex-end"
    },
    h1: {
        color: "#fff",
        fontSize: "14px"
    },
    h2: {
        color: "#fff",
        fontSize: "20px"
    },
    scoreContainer: {
        display: "flex",
        flexDirection: "column"
    },
    pause: {
        height: '40px',
        width: '40px'
    }
})