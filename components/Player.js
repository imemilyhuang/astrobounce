import { StyleSheet } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const Player = ({ position, object }) => {
  return (
    <Animated.Image
      style={[
        styles.player, position
      ]}
      source={require(`../assets/planets/${object}.png`)}
    />
  )
}

export default Player

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: '100px',
    height: '100px',
  }
})