import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const ChooseCharacter = ({setIsChoosing, setCharacter, character}) => {
    const planets = [
        {source: require("../assets/planets/Mercury.png"), name: "Mercury"},
        {source: require("../assets/planets/Venus.png"), name: "Venus"},
        {source: require("../assets/planets/Earth.png"), name: "Earth"},
        {source: require("../assets/planets/Mars.png"), name: "Mars"},
        {source: require("../assets/planets/Jupiter.png"), name: "Jupiter"},
        {source: require("../assets/planets/Saturn.png"), name: "Saturn"},
        {source: require("../assets/planets/Uranus.png"), name: "Uranus"},
        {source: require("../assets/planets/Neptune.png"), name: "Neptune"},
        {source: require("../assets/planets/Pluto.png"), name: "Pluto"},
    ]

    const renderPlanets = planets.map(planet => (
        <Pressable key={planet.name} onPress={() => setCharacter(planet.name)}>
            <Image
                source={planet.source}
                style={[planet.name===character && { borderWidth: "2px", borderColor: "#fff"}, {height: "100px", width: "100px", margin: "8px"}]}
            />
        </Pressable>
    ))

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FIRE UP...</Text>
            <Text style={styles.p}>CHOOSE YOUR PLANET</Text>
            <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: "20px"}}>
                {renderPlanets}
            </View>

            <Pressable style={styles.button} onPress={() => setIsChoosing(false)}>
                <Text style={styles.h1}>LAUNCH →</Text>
            </Pressable>


        </View>
    )
}

export default ChooseCharacter

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
        fontSize: "20px",
        marginTop: "40px"
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