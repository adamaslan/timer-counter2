import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, TextInput, Picker } from 'react-native';

import { useSounds } from './UseSounds';
import { useTimerUI } from './UseSounds';
const Timer = () => {
  const { intervalSound, endingSound } = useSounds('woodblock2.wav', 'https://example.com/ending-sound.wav'); // Provide default URLs
  const {
    seconds,
    desiredTime,
    desiredTimeInput,
    paused,
    intervalSoundURL,
    handleDesiredTimeChange,
    handleDesiredTimeSubmit,
    handleStartPause,
    handleReset,
    handleIntervalSoundChange,
  } = useTimerUI();

  const intervalRef = useRef(null);

  useEffect(() => {
    const handleTimer = () => {
      if (!paused && intervalSound && endingSound) {
        setSeconds(seconds + 1);
        if (seconds % 5 === 0 && intervalSound.isLoaded()) {
          intervalSound.playAsync(); // Play interval sound every 5 seconds
        }
        if (seconds === desiredTime && endingSound.isLoaded()) {
          endingSound.playAsync(); // Play ending sound when timer reaches desired time
        }
      }
    };
  
    if (!paused) {
      intervalRef.current = setInterval(handleTimer, 1000); // Start timer when component mounts (if not paused)
    }
  
    return () => {
      clearInterval(intervalRef.current); // Clear interval on unmount
    };
  }, [paused, intervalSound, endingSound, seconds, desiredTime]);
  

  return (
    <View>
      <Text style={{ fontSize: 50 }}>{seconds.toString().padStart(2, '0')}</Text>
      <TextInput
        keyboardType="numeric"
        value={desiredTimeInput}
        onChangeText={handleDesiredTimeChange}
        placeholder="Enter desired time (seconds)"
      />
      <Button title="Set Time" onPress={handleDesiredTimeSubmit} />
      <Picker
        selectedValue={intervalSoundURL}
        onValueChange={handleIntervalSoundChange}
      >
        {/* Render options for interval sounds */}
      </Picker>
      <Button title="Start/Pause" onPress={handleStartPause} />
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default Timer;
