import { getLeaderboard } from "@/services/gameRequests";
import { ILeaderboard } from "@/services/interfaces";
import React, { useEffect, useState } from "react";
import Loader2 from "../utilities/Loader2";
import styles from "@/sass/leaderboardModalStyles.module.scss";
import LeaderBoard from "./LeaderBoard";

const LeaderboardModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<ILeaderboard[]>([]);

  //   useEffect to get leaderboard info
  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      const response = await getLeaderboard(controller.signal);

      if (response && response.data.users) {
        console.log("users are :", response.data.users);
        setUsers(response.data.users);
        setIsLoading(false);
      }
    };

    getUsers();

    return () => controller.abort();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}></div>
      <div className={styles.modal}>
        {isLoading ? <Loader2 /> : <LeaderBoard users={users} />}
      </div>
    </div>
  );
};

export default LeaderboardModal;
