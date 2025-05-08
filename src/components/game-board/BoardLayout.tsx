import React, { useEffect } from "react";
import ScoreTile from "./ScoreTile";
import styles from "../../sass/boardStylels.module.scss";
import GameBoard from "./GameBoard";
import { HiMiniHome } from "react-icons/hi2";
import { MdOutlineRestartAlt } from "react-icons/md";
import { FaUndoAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  generateStartMatrix,
  playButtonSound,
} from "../../services/helperFunctions";
import GameOverModal from "./GameOverModal";
import GameWinModal from "./GameWinModal";
import { ExtendedGameState, saveGame } from "@/services/gameRequests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";

function BoardLayout() {
  const {
    rows,
    columns,
    scoreAnimate,
    status,
    currScore,
    maxScore,
    prevMatrix,
    undo,
    moves,
    matrix,
    best,
    newTileCoords,
    positionsArr,
  } = useSelector((state: RootState) => state.game);
  const { email } = useSelector((state: RootState) => state.login);
  const {isMuted} = useSelector((state:RootState)=>state.modal)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // we will use a useEffect hook to set the initial state of the matrix for game, this happens
  // only on component reload once or the rows or column changes
  useEffect(() => {
    if (rows && columns && moves === 0) {
      const fnValue = generateStartMatrix(rows, columns);

      dispatch({ type: "game/set_new_tile_coords", payload: fnValue[1] });
      dispatch({ type: "game/set_matrix", payload: fnValue[0] });
    }
  }, [columns, dispatch, rows]);

  // used for score animate sliding
  useEffect(() => {
    if (maxScore > 0)
      dispatch({ type: "game/set_score_animate", payload: true });

    const timer = setTimeout(() => {
      dispatch({ type: "game/set_score_animate", payload: false });
    }, 600);

    return () => clearTimeout(timer);
  }, [maxScore, dispatch]);

  const handleRestartClick = () => {
    dispatch({ type: "game/reset" });
    const fnValue = generateStartMatrix(rows, columns);
    dispatch({ type: "game/set_matrix", payload: fnValue[0] });
    dispatch({ type: "game/set_new_tile_coords", payload: fnValue[1] });
    playButtonSound(isMuted);
  };

  const handleUndoClick = () => {
    if (!undo) return;

    dispatch({ type: "game/set_undo", payload: false });
    dispatch({ type: "game/set_matrix", payload: prevMatrix });
    dispatch({ type: "game/moves", payload: moves - 1 });
    playButtonSound(isMuted);
  };

  const handleHomeClick = () => {
    playButtonSound(isMuted);
    navigate("/");
  };

  // used for checking whether the screen is mobile or desktop, only trigger once at component load
  useEffect(() => {
    if (window.innerWidth <= 400) {
      dispatch({ type: "game/set_screen", payload: "mobile" });
    } else {
      dispatch({ type: "game/set_screen", payload: "desktop" });
    }
  }, [dispatch]);

  // used for checking screen size and triggers on resize event
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        dispatch({ type: "game/set_screen", payload: "mobile" });
      } else {
        dispatch({ type: "game/set_screen", payload: "desktop" });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // useeffect hook to save game after every 5 moves
  useEffect(() => {
    const controller = new AbortController();

    const saveGameFn = async () => {
      // find max tile
      const max_tile = matrix.flat().reduce((prev, curr) => {
        return Math.max(prev, curr);
      }, -1e9);
      // create the gameObj
      const gameObj: ExtendedGameState = {
        email: email,
        prevMatrix: prevMatrix,
        moves: moves,
        max_tile: max_tile,
        matrix: matrix,
        maxScore: maxScore,
        currScore: currScore,
        status: status,
        best: best,
        rows: rows,
        columns: columns,
        undo: undo,
        newTileCoords: newTileCoords,
        positionsArr: positionsArr,
      };

      const response = await saveGame(gameObj, controller.signal);

      if (response) {
        if (response.status !== 200) {
          toast.error(response.data);
          return;
        }
      }
    };

    if (moves % 5 === 0 && moves !== 0) saveGameFn();

    return () => controller.abort();
  }, [moves]);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.game_title}>
          <h1 className={styles.title1}>2048</h1>
          <div className={styles.score_cards_wrapper}>
            {/* score animation card */}
            <div className={styles.score_dummy}>
              {scoreAnimate && (
                <div className={styles.score_animation}>+{currScore}</div>
              )}
            </div>
            <ScoreTile title="Score" score={maxScore} />
            <ScoreTile title="Best" score={best} />
          </div>
        </div>

        <div className={styles.description}>
          <p style={{ fontWeight: "600" }}>Play 2048 game online</p>
          <p>
            Join the numbers and get to the{" "}
            <span style={{ fontWeight: "600" }}>2048 tile!</span>
          </p>
        </div>

        <div className={styles.buttons_wrapper}>
          <button
            className={styles.option_btn}
            style={{ marginRight: "auto" }}
            onClick={handleHomeClick}
          >
            <HiMiniHome className={styles.icon} />
          </button>
          <button
            className={styles.option_btn}
            onClick={handleUndoClick}
            disabled={!undo}
          >
            <FaUndoAlt className={styles.icon} />
          </button>
          <button className={styles.option_btn} onClick={handleRestartClick}>
            <MdOutlineRestartAlt
              className={styles.icon}
              style={{ height: "3.3rem", width: "3.3rem" }}
            />
          </button>
        </div>

        {/* Game Board */}
        <GameBoard />
      </div>

      {status.includes("over") && <GameOverModal />}

      {status.includes("win") && <GameWinModal />}
    </React.Fragment>
  );
}

export default BoardLayout;
