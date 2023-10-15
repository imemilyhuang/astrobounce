import { Dimensions, Easing, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Block from './Block'
import Player from './Player'
import { useAnimatedStyle, useSharedValue, withTiming, withSpring } from "react-native-reanimated"
import uuid from 'react-native-uuid'

const GRAVITY = -0.25
const WINDOW_WIDTH = Dimensions.get("window").width
const WINDOW_HEIGHT = Dimensions.get("window").height

const BLOCK_WIDTH = 100
const BLOCK_HEIGHT = 20

const X_DRAG = 0.3

const Game = ({setIsPlaying, setScore, setGameOver, character}) => {
    const initial = Array(Math.ceil(WINDOW_HEIGHT/75)).fill(0).map((_, index) => {
        if (index==0) {
            return {x: WINDOW_WIDTH/2, y: 100}
        } else {
            return {x: Math.ceil(Math.random() * (WINDOW_WIDTH-BLOCK_WIDTH-100))+50, y: (index+1)*75}
        }
    })

    const blockX = useRef(initial.map(blck => useSharedValue(blck.x)))
    const blockY = useRef(initial.map(blck => useSharedValue(blck.y)))
    
    const blockStyles = blockX.current.map((block, index) => {
        return useAnimatedStyle(() => {
            return {
                left: blockX.current[index].value,
                bottom: blockY.current[index].value
            }
        }, [blockY])
    })

    const renderBlocks = blockStyles.map(block => 
        <Block position={block} key={uuid.v4()} />)

    const xPos = useSharedValue(WINDOW_WIDTH/2)
    const yPos = useSharedValue(400)
    const animatedPosition = useAnimatedStyle(() => {
        return {
            left: withSpring(xPos.value),
            bottom: yPos.value
        }
    }, [xPos, yPos])

    const yVelocity = useSharedValue(0)
    const xVelocity = useSharedValue(0)
    const isJumping = useSharedValue(false)
    const keyPressed = useSharedValue(false)
    const direction = useSharedValue(0)

    const moveBlocks = () => {
        setScore(prev => prev+=1)
        blockY.current.forEach((block, index) => {
            if (block.value - yVelocity.value - BLOCK_HEIGHT <= 0) {
                block.value = WINDOW_HEIGHT
                blockX.current[index].value = Math.ceil(Math.random() * (WINDOW_WIDTH-BLOCK_WIDTH-100))+50
            } else {
                block.value -= yVelocity.value
            }
        })
    }

    const jump = () => {
        if (!isJumping.value) {
            isJumping.value = true

            // Apply an upward yVelocity to simulate jumping
            yVelocity.value = WINDOW_HEIGHT/80
        
            // Simulate falling back down after a short delay (adjust as needed)
            setTimeout(() => {
                isJumping.value = false
            }, 400)
        }
    }

    const detectCollision = () => {
        blockY.current.forEach((block, index) => {
            const blockTop = blockY.current[index].value
            const blockBottom = blockTop + BLOCK_HEIGHT
    
            const blockLeft = blockX.current[index].value - BLOCK_WIDTH/2
            const blockRight = blockLeft + BLOCK_WIDTH
            
            // Check for collision with the blocks
            if (yVelocity.value<0 && yPos.value >= blockTop && yPos.value <= blockBottom 
                && xPos.value >= blockLeft && xPos.value <= blockRight ) {    
                jump() // Trigger jump on collision
            }
        })

        // Check if still in window
        if (yPos.value<=0) {
            setGameOver(true)
            setIsPlaying(false)
        }
        if (xPos.value<=0) {
            xPos.value = 0
        }
        if (xPos.value+100>=WINDOW_WIDTH) {
            xPos.value = WINDOW_WIDTH-100
        }
    }

    // move player left and right
    const movePlayer = () => {
        // limit player within window bounds
        if (xPos.value-xVelocity.value<=0) {
            xPos.value = 0
        } else if (xPos.value+xVelocity.value+100>WINDOW_WIDTH) {
            xPos.value = WINDOW_WIDTH-100
        } else {
            xPos.value += xVelocity.value
            if (xVelocity.value+X_DRAG>=0 || xVelocity.value-X_DRAG<=0) {
                xVelocity.value = 0
                direction.value = 0
            } else if (direction.value === -1) {
                xVelocity.value += X_DRAG
            } else if (direction === 1) {
                xVelocity.value -= X_DRAG
            }
        }
    }

    // record when user presses keys and move player accordingly
    useEffect(() => {
        const handleKeyDown = (event) => {
            keyPressed.value = true
            if (event.key === 'ArrowLeft') {
                direction.value = -1
                xVelocity.value = -15
            } else if (event.key === 'ArrowRight') {
                direction.value = 1
                xVelocity.value = 15
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    useEffect(() => {
        const handleKeyUp = () => {
            keyPressed.value = false
            // block will slow itself down
        }
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])
    

    // simulate gravity, move player and blocks, detect collisions
    useEffect(() => {
        const fallInterval = setInterval(() => {
            // Apply gravity to the player's yVelocity
            yVelocity.value += GRAVITY

            if (yVelocity.value > 0 
                && yPos.value > WINDOW_HEIGHT/2) {
                moveBlocks()
            } else {
                yPos.value += yVelocity.value
            }
            detectCollision()
            movePlayer()
        }, 20)
    
        return () => clearInterval(fallInterval)
    }, [])


    return (
        <ImageBackground style={styles.screen} source={require("../assets/backgrounds/Starry Background.png")}>
            <Player position={animatedPosition} object={character} />
            { renderBlocks }
        </ImageBackground>
    )
}

export default Game

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "100%",
        resizeMode: 'cover',
        justifyContent: "center"
    }
})