import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, TextInput, Picker } from 'react-native';
import { Audio } from 'expo-av';

const Timer = () => {
  // State variables, including desiredTime and intervalSoundURL
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);
  const [intervalSound, setIntervalSound] = useState(null);
  const [endingSound, setEndingSound] = useState(null);
  const [desiredTime, setDesiredTime] = useState(60);
  const [desiredTimeInput, setDesiredTimeInput] = useState(60);

  const [intervalSoundURL, setIntervalSoundURL] = useState('woodblock2.wav');
  const availableSounds = ['woodblock2.wav', 'frogblock1.wav', 'woodblock1.aiff'];
  const endingSoundURL = 'https://example.com/ending-sound.wav';
  const intervalRef = useRef(null);

  // Update desiredTimeInput based on input
  const handleDesiredTimeChange = (newTime) => {
    setDesiredTimeInput(newTime);
  };

  // Convert desiredTimeInput to a number and update desiredTime
  const handleDesiredTimeSubmit = () => {
    const newTime = Number(desiredTimeInput);
    if (!isNaN(newTime)) {
      setDesiredTime(newTime);
    }
  };

  // Load sounds asynchronously in useEffect
  // useEffect(() => {
  //   const loadIntervalSound = async () => {
  //     // Create a new sound object from the given url
  //     const sound = new Audio.Sound();
  //     // Load the sound asynchronously
  //     const { sound } = await sound.loadAsync({ uri: intervalSoundURL });
  //     // Set the sound object to the state variable
  //     setIntervalSound(sound);
  //   };
  //   loadIntervalSound();

  //   const loadEndingSound = async () => {
  //     // Create a new sound object from the given url
  //     const sound = new Audio.Sound();
  //     // Load the sound asynchronously
  //     const { sound } = await sound.loadAsync({ uri: endingSoundURL });
  //     // Set the sound object to the state variable
  //     setEndingSound(sound);
  //   };
  //   loadEndingSound();

  //   // Start timer when component mounts (if not paused)
  //   if (!paused) {
  //     intervalRef.current = setInterval(handleTimer, 1000);
  //   }

  //   return () => {
  //     // Cleanup sounds and clear interval on unmount
  //     if (intervalSound) intervalSound.unloadAsync();
  //     if (endingSound) endingSound.unloadAsync();
  //     clearInterval(intervalRef.current);
  //   };
  // }, [paused, intervalSoundURL]); // Re-run effect when paused state or intervalSoundURL changes

  // Handle timer logic, ensuring sounds are loaded before playing
  const handleTimer = () => {
    if (!paused && intervalSound && endingSound) {
      setSeconds(seconds + 1);
      if (seconds % 5 === 0) {
        // Check if the sound is loaded before playing it
        if (intervalSound.isLoaded()) {
          // Play the sound without interruption
          intervalSound.playAsync();
        }
      }
      if (seconds === desiredTime) {
        // Check if the sound is loaded before playing it
        if (endingSound.isLoaded()) {
          // Play the sound without interruption
          endingSound.playAsync();
        }
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

  // Allow user to choose interval sound
  const handleIntervalSoundChange = (sound) => {
    setIntervalSoundURL(sound);
  };

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
        {availableSounds.map((sound) => (
          <Picker.Item key={sound} label={sound} value={sound} />
        ))}
      </Picker>
      <Button title="Start/Pause" onPress={handleStartPause} />
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default Timer;
