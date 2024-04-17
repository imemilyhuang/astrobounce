import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import pauseImg from "../assets/planets/Pause.png"
import pauseHoverImg from "../assets/planets/Pause Hovering.png"
import HoverButton from './HoverButton'

const Nav = ({score, setPaused, highScore, stopMove, character, setIsChoosing}) => {
    const [hoveringPause, setHoveringPause] = useState(false)
    const [hoveringBtn, setHoveringBtn] = useState(false)

    const handlePause = () => {
        setPaused(true)
        stopMove.value = true
    }

    const handleChoose = () => {
        stopMove.value = true
        setIsChoosing(true)
    }

    return (
        <View style={styles.container}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Pressable
                    onHoverIn={() => setHoveringPause(true)}
                    onHoverOut={() => setHoveringPause(false)}
                    onPress={handlePause}
                    style={{marginRight: "16px"}}
                >
                    <Image 
                        style={styles.pause}
                        source={hoveringPause ? pauseHoverImg :
                            pauseImg 
                        }
                    />
                </Pressable>
                <HoverButton 
                    onPressFunc={handleChoose}
                    text={character.toUpperCase()}
                />
            </View>
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
        backgroundColor: "#000",
        top: 0,
        width: "100%",
        paddingHorizontal: "20px",
        flexDirection: "row",
        zIndex: "1000",
        justifyContent: "space-between",
        alignItems: "center"
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
    scoreContainer: {
        display: "flex",
        flexDirection: "column"
    },
    pause: {
        height: '40px',
        width: '40px'
    }
})