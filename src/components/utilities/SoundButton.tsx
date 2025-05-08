import React from "react";
import styles from "@/sass/soundButtonStyles.module.scss";
import { PiSpeakerHighFill } from "react-icons/pi";
import { PiSpeakerSlashFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { playButtonSound } from "@/services/helperFunctions";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store";

const SoundButton: React.FC = () => {
  const { isMuted } = useSelector((state: RootState) => state.modal);

  const dispatch: AppDispatch = useDispatch();

  const handleSoundButtonClick = () => {
    playButtonSound(isMuted);
    dispatch({ type: "modal/mute", payload: !isMuted });
    dispatch({ type: "login/set_music", payload: isMuted });
  };

  return (
    <button onClick={handleSoundButtonClick} className={styles.sound_btn}>
      {isMuted ? (
        <PiSpeakerSlashFill className={styles.icon} />
      ) : (
        <PiSpeakerHighFill className={styles.icon} />
      )}
    </button>
  );
};

export default SoundButton;
