import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const useSounds = (intervalSoundURL, endingSoundURL) => {
  const [intervalSound, setIntervalSound] = useState(null);
  const [endingSound, setEndingSound] = useState(null);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Load interval sound
        const intervalSoundObj = new Audio.Sound();
        await intervalSoundObj.loadAsync({ uri: intervalSoundURL });
        setIntervalSound(intervalSoundObj);

        // Load ending sound
        const endingSoundObj = new Audio.Sound();
        await endingSoundObj.loadAsync({ uri: endingSoundURL });
        setEndingSound(endingSoundObj);
      } catch (error) {
        console.error('Error loading sounds:', error);
        // Handle errors as needed
      }
    };

    loadSounds();
  }, [intervalSoundURL, endingSoundURL]); // Re-run if URLs change

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => {
      if (intervalSound) intervalSound.unloadAsync();
      if (endingSound) endingSound.unloadAsync();
    };
  }, []);

  return { intervalSound, endingSound };
};
