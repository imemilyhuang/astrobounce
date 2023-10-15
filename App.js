import { StyleSheet, View } from 'react-native';
import Game from './components/Game';
import { useEffect, useRef, useState } from 'react';
import Welcome from './components/Welcome';
import { Audio } from 'expo-av';
import Nav from './components/Nav';
import Pause from './components/Pause';
import GameOver from './components/GameOver';
import ChooseCharacter from './components/ChooseCharacter';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [character, setCharacter] = useState("Earth")
  const [isChoosing, setIsChoosing] = useState(true)

  // for starting the music
  const playing = useRef(false)
  async function playSound() {
    if (playing.current===false) {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/sounds/moo - SPACE POTATOES.mp3'), {
          isMuted: false,
          shouldPlay: false,
          isLooping: true
        }
      );
      playing.current = true
  
      await sound.playAsync();
    }
  }
  useEffect(() => {
    if (playing.current===false) {
      window.addEventListener("click", playSound);
      window.addEventListener("keydown", playSound);
      return () => {
        window.removeEventListener("click", playSound);
        window.removeEventListener("keydown", playSound);
      };
    }
  },[])

  useEffect(() => {
    setHighScore(prev => {
      if (prev <score) {
        return score
      } else {
        return prev
      }
    })
    setScore(0)
  }, [isPlaying])

  return (
    <View style={styles.container}>
      {paused && <Pause character={character} setIsPlaying={setIsPlaying} setPause={setPaused}/>}
      {isPlaying && isChoosing && <ChooseCharacter character={character}  setIsChoosing={setIsChoosing} setCharacter={setCharacter} /> }
      {
        isPlaying ? <> 
          <Nav highScore={highScore} score={score} paused={paused} setPaused={setPaused} />
          <Game character={character} setGameOver={setGameOver} setIsPlaying={setIsPlaying} setScore={setScore} /> 
        </> :
          gameOver ? 
            <GameOver character={character} score={score} setIsPlaying={setIsPlaying} setGameOver={setGameOver} />  :
              <Welcome setIsPlaying={setIsPlaying} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
