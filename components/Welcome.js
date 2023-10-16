import { StyleSheet, Text, Pressable, Image, Dimensions, Easing, View } from 'react-native'
import React, { useEffect } from 'react'
// import { Motion } from "@legendapp/motion"
import Animated, { FadeIn, FadeOut, useAnimatedStyle, withTiming, withRepeat, withSequence, useSharedValue } from "react-native-reanimated"
import HoverButton from './HoverButton'

const WINDOW_HEIGHT = Dimensions.get("window").height
const WINDOW_WIDTH = Dimensions.get("window").width

const Welcome = ({setIsPlaying}) => {
    const sv = useSharedValue(0);

    useEffect(() => {
        sv.value = withRepeat(
            withSequence(
                withTiming(20, { duration:1400, easing:Easing.bezier(0.65, 0, 0.35, 1) }),
                withTiming(0, { duration:1400, easing:Easing.bezier(0.65, 0, 0.35, 1) }),
            )
            , -1);
    }, []);

    const pos = useAnimatedStyle(() => {
        return {
            left: WINDOW_WIDTH/2-200, bottom: WINDOW_HEIGHT/2-400+sv.value
        }
    }, [sv])

    return (
        <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
            <Animated.View
                style={[{position: "absolute"}, pos]}
            >
                <Image
                    style={{width: "400px", height: "400px"}}
                    source={require("../assets/planets/Venus.png")}
                />   
            </Animated.View> 

            <Text style={styles.p}>welcome to</Text>
            <Text style={styles.title}>⭐ ASTROBOUNCE 🪐</Text>
            <HoverButton 
                onPressFunc={() => setIsPlaying(true)}
                text="PLAY"
            />
            <View style={{height: "300px"}} />
        </Animated.View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    title: {
        color: "#fff",
        fontSize: "48px",
    },
    p: {
        color: "#fff",
        fontSize: "20px"
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
        marginTop: "32px"
    }

})
