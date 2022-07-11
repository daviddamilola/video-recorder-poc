/* eslint-disable react-hooks/exhaustive-deps */
import { formatTime } from "../utils";
import { useEffect, useState } from "react";
import { useRecorder } from "../context";

const Timer = ({ stopRecording, recorderStatus, currentTime }) => {
    const { state, dispatch } = useRecorder();
    const [remainingTime, setRemainingTime] = useState(120);
    useEffect(() => {
      console.log("recorderStatus", recorderStatus);
      if (state.status !== "recording" && recorderStatus !== "recording") return;
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      if (remainingTime <= 0) {
        stopRecording();
        dispatch({
          type: "stopRecord",
        });
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [remainingTime, state.status, recorderStatus]);
  
    return (
      <button className="rounded-sm ml-3 bg-blue-400 text-white py-2 px-4">
        Remaining Time: {formatTime(remainingTime)}
      </button>
    );
  };

  
  export default Timer;