import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/sass/continueModalStyles.module.scss";
import { useNavigate } from "react-router-dom";
import { playButtonSound } from "@/services/helperFunctions";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store";

const ContinueModal: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.login);
  const { isMuted } = useSelector((state: RootState) => state.modal);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleYesClick = () => {
    playButtonSound(isMuted);
    dispatch({ type: "login/set_music", payload: true });
    navigate("/game");
  };

  const handleNoClick = () => {
    playButtonSound(isMuted);
    dispatch({ type: "game/reset_full" });
    dispatch({ type: "login/set_music", payload: true });
    dispatch({ type: "modal/game_continue", payload: false });
  };

  return (
    <div className={styles.bg_wrapper}>
      <div className={styles.container}>
        <p className={styles.info_text}>
          Hello <span>{username}</span>, would you like to continue where you
          left?
        </p>

        <div className={styles.btns_wrapper}>
          <button className={styles.option_btn} onClick={handleYesClick}>
            Yes
          </button>
          <button className={styles.option_btn} onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>

      {/* bg */}
      <div className={styles.bg}></div>
    </div>
  );
};

export default ContinueModal;
