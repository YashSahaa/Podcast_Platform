import React, { useEffect, useRef, useState } from 'react';
import "./style.css";
import { FaPlay,FaPause,FaVolumeUp,FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = ({audioSrc,image}) => {
  const audioRef = useRef();
  const [isPlaying,setIsPlaying] = useState(true);
  const [isMute,setIsMute] = useState(false);
  const [duration,setDuration] = useState(0);
  const [currentTime,setCurrentTime] = useState(0);
  const [volume,setVolume] = useState(1);

  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
  },[isPlaying]);

  useEffect(()=>{
    if(isMute){
      audioRef.current.volume = 0;
      setVolume(0);
    }else{
      audioRef.current.volume = 1;
      setVolume(1);
    }
  },[isMute]);

  useEffect(()=>{
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedMetaData", handleLoadedMetaData);
    audio.addEventListener("ended", handleEnded);

    return () =>{
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedMetaData", handleLoadedMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  },[]);

  const handleTimeUpdate = () =>{
    setCurrentTime(audioRef.current.currentTime);
  }
  const handleLoadedMetaData = () =>{
    setDuration(audioRef.current.duration);
  }
  const handleEnded = () =>{
    setCurrentTime(0);
    setIsPlaying(false);
  }

  const handleDuration = (e) =>{
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  const handleVolume = (e) =>{
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  const togglePlay = () =>{
    if(isPlaying){
      setIsPlaying(false);
    }
    else{
      setIsPlaying(true);
    }
  }

  const toggleVolume = () =>{
    if(isMute){
      setIsMute(false);
    }
    else{
      setIsMute(true);
    }
  }

  const formatTime = (time) =>{
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return `${minutes}:${seconds<10?"0":""}${seconds}`;
  }

  return (
    <div className='custom-audio-player'>
      <img src={image} className='display-image-player'/>
      <audio ref={audioRef} src={audioSrc}/>
      <p className='audio-btn' onClick={togglePlay}>{isPlaying?<FaPause/>:<FaPlay/>}</p>
      <div className='duration-flex'>
        <p>{formatTime(currentTime)}</p>
        <input type='range' value={currentTime} min={0} max={duration} step={0.01} onChange={handleDuration} className='duration-range'/>
        <p>{formatTime(duration - currentTime)}</p>
      </div>
      <p className='audio-btn' onClick={toggleVolume}>{isMute?<FaVolumeMute/>:<FaVolumeUp/>}</p>
      <input type='range' value={volume} max={1} min={0} step={0.01} onChange={handleVolume} className='volume-range'/>
    </div>
  )
}

export default AudioPlayer;
