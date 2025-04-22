import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import BoardLayout from "./components/game-board/BoardLayout";
import LandingPage from "./components/landing/LandingPage";
import { RootState } from "./store";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";
import Loader from "./components/utilities/Loader";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";

function App() {
  const { status } = useSelector((state: RootState) => state.game);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const [confetti, setConfetti] = useState<Boolean>(false);
  const [spinner, setSpinner] = useState<Boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSpinner(false);
    }, 6000);

    // cleanup function
    return () => clearTimeout(timeoutId);
  }, [spinner]);

  useEffect(() => {
    if (status.includes("win")) setConfetti(true);
  }, [confetti, status]);

  if (spinner) return <Loader />;

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <LandingPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/game"
          element={
            status.includes("not started") ? (
              <Navigate to="/" replace />
            ) : (
              <BoardLayout />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        {/* fall back index route */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {confetti && (
          <div className={styles.confetti_container}>
            <ConfettiExplosion
              zIndex={10}
              height={3000}
              width={2000}
              duration={5000}
              particleCount={200}
              force={0.4}
              onComplete={() => setConfetti(false)}
              className={styles.confetti1}
            />
            <ConfettiExplosion
              zIndex={10}
              height={3000}
              particleCount={200}
              width={2000}
              duration={5000}
              force={0.4}
              onComplete={() => setConfetti(false)}
              className={styles.confetti2}
            />
          </div>
        )}
      </Routes>
    </div>
  );
}

export default App;
