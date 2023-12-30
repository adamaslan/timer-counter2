import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native-web';
import TrackPlayer from 'react-native-track-player'; // Assuming react-native-track-player

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);
  const [intervalDuration, setIntervalDuration] = useState(5);
  const [desiredTime, setDesiredTime] = useState(60); // Assuming a default desired time

  // User-provided sound URLs (replace with actual URLs)
  const startingSoundUrl = 'https://example.com/starting-sound.mp3';
  const endingSoundUrl = 'https://example.com/ending-sound.mp3';
  const intervalSoundUrl = 'https://example.com/interval-sound.mp3';

  useEffect(() => {
    const loadSounds = async () => {
      await TrackPlayer.add({ id: 'startingSound', url: startingSoundUrl });
      await TrackPlayer.add({ id: 'endingSound', url: endingSoundUrl });
      await TrackPlayer.add({ id: 'intervalSound', url: intervalSoundUrl });
    };
    loadSounds();
  }, []);

  const handleTimer = () => {
    if (!paused) {
      setSeconds(seconds + 1);
      if (seconds % intervalDuration === 0) {
        TrackPlayer.play('intervalSound');
      }
      if (seconds === desiredTime) {
        TrackPlayer.play('endingSound');
        setPaused(true); // Stop timer when desired time is reached
      }
    }
  };

  const handleStartPause = () => {
    setPaused(!paused);
    if (!paused) {
      setSeconds(0); // Reset timer on start
      TrackPlayer.play('startingSound');
    }
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
