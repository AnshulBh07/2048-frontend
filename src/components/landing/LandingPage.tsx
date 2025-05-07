import styles from "../../sass/homeScreenStyles.module.scss";
import Grid8x8 from "../../assets/images/8x8Grid.png";
import Grid6x6 from "../../assets/images/6x6Grid.png";
import Grid5x5 from "../../assets/images/5x5Grid.png";
import Grid4x4 from "../../assets/images/4x4Grid.png";
import { useState } from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import ContinueModal from "../modal/gameContinueModal";
import { playButtonSound } from "@/services/helperFunctions";
import LeaderboardModal from "../modal/LeaderboardModal";

function LandingPage() {
  const [selected, setSelected] = useState({ idx: 0, val: "4x4" });
  const { gameContinueModal, leaderBoardModal } = useSelector(
    (state: RootState) => state.modal
  );

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleGridSelection = (e: React.FormEvent<HTMLFormElement>) => {
    playButtonSound();
    e.preventDefault();

    dispatch({ type: "game/set_status", payload: "playing" });

    navigate("/game");
  };

  const radioOptions = [
    { value: "4x4", link: Grid4x4 },
    { value: "5x5", link: Grid5x5 },
    { value: "6x6", link: Grid6x6 },
    { value: "8x8", link: Grid8x8 },
  ];

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    setSelected({ idx: index, val: value });

    dispatch({ type: "game/set_game", payload: value });
  };

  const handleLeaderBoardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    playButtonSound();
    dispatch({ type: "modal/leaderboard", payload: true });
  };

  const handleGuideClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    playButtonSound();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleGridSelection} className={styles.container}>
        <div className={styles.radio_group}>
          {radioOptions.map((option, idx) => {
            return (
              <label className={styles.radio_label} key={idx}>
                <input
                  className={styles.option}
                  name="options"
                  type="radio"
                  value={option.value}
                  checked={selected.idx === idx}
                  onChange={(e) => handleSelectChange(e, idx)}
                />
                <img
                  src={option.link}
                  alt="option-png"
                  className={styles.option_img}
                />

                <p
                  className={styles.option_text}
                  style={{ opacity: selected.idx === idx ? "1" : "0.5" }}
                >
                  {option.value}
                </p>

                <span
                  className={`${styles.option_overlay} ${
                    selected.idx === idx ? styles.select : ""
                  }`}
                ></span>
              </label>
            );
          })}
        </div>

        <div className={styles.btns_group}>
          <button
            className={styles.trophy_btn}
            onClick={handleLeaderBoardClick}
          >
            <GiLaurelsTrophy className={styles.icon} />
          </button>
          <button className={styles.start_btn} type="submit">
            <BiSolidRightArrow className={styles.icon} />
          </button>
          <button className={styles.guide_btn} onClick={handleGuideClick}>
            <FaBook className={styles.icon} />
          </button>
        </div>
      </form>

      {gameContinueModal && <ContinueModal />}
      {leaderBoardModal && <LeaderboardModal />}
    </React.Fragment>
  );
}

export default LandingPage;
