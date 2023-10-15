import { StyleSheet } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const Block = ({position}) => {
    return (
        <Animated.View 
            style={[styles.block, position]}
        />
    )
}

export default Block

const styles = StyleSheet.create({
    block: {
        position: 'absolute',
        width: '100px',
        height: '20px',
        borderRadius: '5px',
        backgroundColor: 'white',
        zIndex: "-1"
    }
})