import React from "react";
import styles from "@/sass/guideModalStyles.module.scss";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { playButtonSound } from "@/services/helperFunctions";

const GuideModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleBackClick = () => {
    playButtonSound();
    dispatch({ type: "modal/guide", payload: false });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>

      <div className={styles.modal}>
        <div className={styles.info_section}>
          <section className={styles.intro_section}>
            <h2>🧠 What is 2048?</h2>
            <p>
              2048 is a simple yet addictive puzzle game. Combine number tiles
              to reach 2048 - and beyond!
            </p>
            <p>
              🧩 Every move slides all tiles in the chosen direction. Tiles with
              the same number combine into one.
            </p>
          </section>
          <hr className={styles.separtor} />

          <section className={styles.howto_section}>
            <h2>🎮 How to Play</h2>
            <ul>
              <li>
                Use Arrow Keys ⬅️ ⬆️ ➡️ ⬇️ (or swipe on mobile) to move the
                tiles.
              </li>
              <li>
                When two tiles with the same number touch, they merge into one!
              </li>
              <li>Each move spawns a new tile (2).</li>
              <li>Keep merging until you get [2048] or more!</li>
            </ul>
          </section>

          <hr className={styles.separtor} />

          <section className={styles.tips_section}>
            <h2>💡 Pro Tips</h2>
            <ul style={{ gap: "1rem" }}>
              <li className={styles.list_item}>
                <strong>🧠 Stay in control:</strong>
                <p>
                  Try to keep your largest tile in a corner and build around it.
                </p>
              </li>
              <li className={styles.list_item}>
                <strong>↔️ Stick to 2 directions:</strong>
                <p>
                  Use mostly LEFT and DOWN (or any two) to keep tiles organized.
                </p>
              </li>
              <li className={styles.list_item}>
                <strong>🪤 Avoid blocking yourself:</strong>
                <p>
                  If you randomly swipe around, you’ll quickly run out of moves.
                </p>
              </li>
              <li className={styles.list_item}>
                <strong>🧼 Clear space smartly:</strong>
                <p>
                  Sometimes it’s better to wait to merge tiles so you have more
                  room.
                </p>
              </li>
            </ul>
          </section>

          <hr className={styles.separtor} />

          <section className={styles.goals_section}>
            <h2>🏁 When the Game Ends</h2>
            <p>☠️ Game Over happens when:</p>
            <ul>
              <li>
                The board is full <strong>AND</strong>
              </li>
              <li>No adjacent tiles can merge.</li>
            </ul>
            <p>🔁 You can restart any time and aim for a higher score!</p>
          </section>

          <hr className={styles.separtor} />

          <section className={styles.controls_section}>
            <h2>🕹️ Controls</h2>
            <ul>
              <li>
                <strong>Keyboard:</strong> Arrow keys
              </li>
              <li>
                <strong>Mobile:</strong> Swipe
              </li>
              <li>
                <strong>Restart:</strong> Press the Restart button or{" "}
                <strong>R</strong> key
              </li>
              <li>
                <strong>Undo:</strong> Press <strong>Z</strong> or tap Undo
                button
              </li>
            </ul>
          </section>
        </div>

        <button className={styles.back_btn} onClick={handleBackClick}>
          back
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
