import { useState } from 'react';

export const useTimerUI = () => {
  const [seconds, setSeconds] = useState(0);
  const [desiredTime, setDesiredTime] = useState(60);
  const [desiredTimeInput, setDesiredTimeInput] = useState(60);
  const [paused, setPaused] = useState(true);
  const [intervalSoundURL, setIntervalSoundURL] = useState('woodblock2.wav');

  const handleDesiredTimeChange = (newTime) => {
    setDesiredTimeInput(newTime);
  };

  const handleDesiredTimeSubmit = () => {
    const newTime = Number(desiredTimeInput);
    if (!isNaN(newTime)) {
      setDesiredTime(newTime);
    }
  };

  const handleStartPause = () => {
    setPaused(!paused);
  };

  const handleReset = () => {
    setSeconds(0);
    setPaused(true);
  };

  const handleIntervalSoundChange = (sound) => {
    setIntervalSoundURL(sound);
  };

  return {
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
  };
};
