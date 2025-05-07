import React from "react";
import styles from "@/sass/leaderBoardStyles.module.scss";
import { ILeaderboard } from "@/services/interfaces";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { playButtonSound } from "@/services/helperFunctions";

interface Iprops {
  users: ILeaderboard[];
}

const tileColors = new Map([
  [2, "#eee4da"], // light beige
  [4, "#ede0c8"], // cream
  [8, "#f2b179"], // light orange
  [16, "#f59563"], // orange
  [32, "#f67c5f"], // deep orange
  [64, "#f65e3b"], // red-orange
  [128, "#edcf72"], // gold
  [256, "#edcc61"], // goldenrod
  [512, "#edc850"], // mustard
  [1024, "#edc53f"], // deeper mustard
  [2048, "#edc22e"], // rich gold
  [4096, "#bd0d00"], // deep brown/charcoal for high tiles
]);

const LeaderBoard: React.FC<Iprops> = ({ users }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBackButtonClick = () => {
    playButtonSound();
    dispatch({ type: "modal/leaderboard", payload: false });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Global Leaderboard</h2>
      {/* table for leaderboard */}
      <div className={styles.tables_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Max Tile</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
        <div className={styles.scroll_table}>
          <table className={styles.table2}>
            <tbody>
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <tr
                      key={`${user.username}-${index}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "#f5f4f2" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <td>{user.username}</td>
                      <td
                        style={{
                          color: `${
                            tileColors.get(user.max_tile) || "#3c3a32"
                          }`,
                          fontWeight: "700",
                        }}
                      >
                        {user.max_tile}
                      </td>
                      <td>{user.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={handleBackButtonClick} className={styles.back_btn}>
        back
      </button>
    </div>
  );
};

export default LeaderBoard;
