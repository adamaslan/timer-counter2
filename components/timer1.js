import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import Sound from 'react-native-sound';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);
  const [intervalSound, setIntervalSound] = useState(null);
  const [endingSound, setEndingSound] = useState(null);

  const intervalSoundURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace with your chosen interval sound URL
  const endingSoundURL = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-5460-old-fashioned-school-bell-ringing.mp3'; // Replace with your chosen ending sound URL

  useEffect(() => {
    // Load interval sound
    const loadIntervalSound = async () => {
      setIntervalSound(new Sound(intervalSoundURL, (error) => {
        if (error) {
          console.error('Error loading interval sound:', error);
        }
      }));
    };
    loadIntervalSound();

    // Load ending sound
    const loadEndingSound = async () => {
      setEndingSound(new Sound(endingSoundURL, (error) => {
        if (error) {
          console.error('Error loading ending sound:', error);
        }
      }));
    };
    loadEndingSound();

    return () => {
      // Cleanup
      if (intervalSound) intervalSound.release();
      if (endingSound) endingSound.release();
    };
  }, []);

  const handleTimer = () => {
    if (!paused) {
      setSeconds(seconds + 1);
      if (seconds % 5 === 0) { // Play interval sound every 5 seconds
        intervalSound.play();
      }
      if (seconds === desiredTime) { // Replace desiredTime with your target duration
        endingSound.play();
      }
    }
  };

  const handleStartPause = () => {
    setPaused(!paused);
  };

  const handleReset = () => {
    setSeconds(0);
    setPaused(true);
  };

  return (
    <View>
      <Text style={{ fontSize: 50 }}>{seconds.toString().padStart(2, '0')}</Text>
      <Button title="Start/Pause" onPress={handleStartPause} />
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default Timer;
