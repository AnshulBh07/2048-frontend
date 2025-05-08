import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.scss";
import BoardLayout from "./components/game-board/BoardLayout";
import LandingPage from "./components/landing/LandingPage";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useRef, useState } from "react";
import Loader from "./components/utilities/Loader";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import LoginForm from "./components/login/LoginForm";
import SignupForm from "./components/login/SignupForm";
import OTPForm from "./components/login/OTPForm";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { setGameState } from "./services/helperFunctions";
import BackgroundMusic from "./components/utilities/BackgroundMusic";
import VictorySound from "@/assets/sounds/victory.wav";
import SoundButton from "./components/utilities/SoundButton";
import { RootState } from "./store/rootReducer";
import { AppDispatch } from "./store";

function App() {
  const { status } = useSelector((state: RootState) => state.game);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const [confetti, setConfetti] = useState<Boolean>(false);
  const [spinner, setSpinner] = useState<Boolean>(true);
  const audioRef = useRef(new Audio(VictorySound));

  const dispatch: AppDispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSpinner(false);
    }, 5000);

    // cleanup function
    return () => clearTimeout(timeoutId);
  }, [spinner]);

  useEffect(() => {
    if (status.includes("win")) {
      setConfetti(true);
      audioRef.current.volume = 1;
      audioRef.current.loop = true;
      audioRef.current.play();
    }
  }, [confetti, status]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.onended = null;
    };
  }, []);

  // make a request for auto login
  useEffect(() => {
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${BASE_URL}/login/me`,
          withCredentials: true,
          signal: controller.signal,
        });

        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.userInfo
        ) {
          if (response.data.userInfo.gameState)
            setGameState(dispatch, response.data.userInfo.gameState);

          dispatch({
            type: "login/username",
            payload: response.data.userInfo.username,
          });
          dispatch({
            type: "login/email",
            payload: response.data.userInfo.email,
          });
          dispatch({
            type: "login/logged",
            payload: true,
          });
          dispatch({ type: "login/set_music", payload: true });
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUser();

    return () => controller.abort();
  }, []);

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
        <Route path="/login" element={<Login />}>
          <Route index element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="signup/verify" element={<OTPForm />} />
        </Route>
        {/* fall back index route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {confetti && (
        <div className={styles.confetti_container}>
          <ConfettiExplosion
            zIndex={10}
            height={3000}
            width={2000}
            duration={5000}
            particleCount={200}
            force={0.4}
            onComplete={() => {
              setConfetti(false);
              audioRef.current.pause();
              audioRef.current.onended = null;
            }}
            className={styles.confetti1}
          />
          <ConfettiExplosion
            zIndex={10}
            height={3000}
            particleCount={200}
            width={2000}
            duration={5000}
            force={0.4}
            onComplete={() => {
              setConfetti(false);
              audioRef.current.pause();
              audioRef.current.onended = null;
            }}
            className={styles.confetti2}
          />
        </div>
      )}
      <ToastContainer />
      <BackgroundMusic />
      <SoundButton />
    </div>
  );
}

export default App;
