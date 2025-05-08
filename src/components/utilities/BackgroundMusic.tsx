import React, { useEffect, useRef, useState } from "react";
import track1 from "@/assets/sounds/bg_track1.mp3";
import track2 from "@/assets/sounds/bg_track2.mp3";
import track3 from "@/assets/sounds/bg_track3.mp3";
import track4 from "@/assets/sounds/bg_track4.mp3";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

const BackgroundMusic: React.FC = () => {
  const { isMusicEnabled } = useSelector((state: RootState) => state.login);
  const { isMuted } = useSelector((state: RootState) => state.modal);
  const tracks: string[] = [track1, track2, track3, track4]
    .map((track) => new Array(3).fill(track))
    .flat();

  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(new Audio(tracks[0]));

  //   useEffect to play audio on component load, executes whenever currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;

    if (isMusicEnabled && !isMuted) {
      audioRef.current.volume = 0.5;
      audio.src = tracks[currentTrack];
      audio.play();

      // on track end
      audio.onended = () => {
        const nextTrack = (currentTrack + 1) % tracks.length;
        setCurrentTrack(nextTrack);
      };
    }

    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, [currentTrack, isMusicEnabled, isMuted]);

  //   useEffect that triggers when component unmounts
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return null;
};

export default BackgroundMusic;
