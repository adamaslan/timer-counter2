import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button } from 'react-native';
import Sound from 'react-native-sound';

const Timer = () => {
  // State variables for timer, sounds, and paused state
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);
  const [intervalSound, setIntervalSound] = useState(null);
  const [endingSound, setEndingSound] = useState(null);
  const [desiredTime, setDesiredTime] = useState(60); // Added to track target duration
  const intervalRef = useRef(null); // Reference to store the interval

  // Load sounds asynchronously in useEffect
  useEffect(() => {
    const loadIntervalSound = async () => {
      setIntervalSound(new Sound(intervalSoundURL, (error) => {
        if (error) {
          console.error('Error loading interval sound:', error);
        }
      }));
    };
    loadIntervalSound();

    const loadEndingSound = async () => {
      setEndingSound(new Sound(endingSoundURL, (error) => {
        if (error) {
          console.error('Error loading ending sound:', error);
        }
      }));
    };
    loadEndingSound();

    // Start timer when component mounts (if not paused)
    if (!paused) {
      intervalRef.current = setInterval(handleTimer, 1000);
    }

    return () => {
      // Cleanup sounds and clear interval on unmount
      if (intervalSound) intervalSound.release();
      if (endingSound) endingSound.release();
      clearInterval(intervalRef.current);
    };
  }, [paused]); // Re-run effect when paused state changes

  // Handle timer logic, ensuring sounds are loaded before playing
  const handleTimer = () => {
    if (!paused && intervalSound && endingSound) {
      setSeconds(seconds + 1);
      if (seconds % 5 === 0) {
        intervalSound.play();
      }
      if (seconds === desiredTime) {
        endingSound.play();
      }
    }
  };

  // Handle start/pause button click, managing the interval
  const handleStartPause = () => {
    if (paused) {
      intervalRef.current = setInterval(handleTimer, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    setPaused(!paused);
  };

  // Handle reset button click
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
