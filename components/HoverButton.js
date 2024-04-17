import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const HoverButton = ({onPressFunc, text}) => {
    const [hovering, setHovering] = useState(false)

    return (
        <Pressable
            onHoverIn={() => setHovering(true)}
            onHoverOut={() => setHovering(false)}
            onPress={onPressFunc}
            style={[styles.button, hovering && styles.buttonHover]}
        >
            <Text style={hovering ? styles.textHover : styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

export default HoverButton

const styles = StyleSheet.create({
    button: {
        borderWidth: "2px",
        borderColor: "#fff",
        paddingHorizontal: "8px",
        paddingVertical: "4px",
        marginTop: "20px",
        marginBottom: '20px'
    },
    text: {
        color: "#fff",
        fontSize: "24px"
    },
    buttonHover: {
        backgroundColor: "#fff"
    },
    textHover: {
        color: "#000",
        fontSize: "24px"
    }
})
