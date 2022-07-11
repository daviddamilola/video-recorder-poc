/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Dialogue from "../Dialog";
import Timer from "./components/Timer";
import reducer, { initialState } from "./reducer";

const RecorderContext = createContext(null);

const RecorderProvider = ({ children, handleUpload=() => {} }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true, stopStreamsOnStop: true });

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const onRecord = () => {
    startRecording();
    dispatch({
      type: "onRecord",
    });
  };

  const onStopRecording = () => {
    stopRecording();
    dispatch({
      type: "stopRecord",
    });
  };

  const onUpload = async (url) => {
    try {
      const videoBlob = await fetch(url).then((r) => r.blob());
      dispatch({
        type: "beginUpload",
        payload: {
          videoBlob,
        },
      });
      await handleUpload(videoBlob);
      dispatch({
        type: "uploadSuccess",
      });
    } catch (error) {
      dispatch({
        type: "uploadError",
      });
    }
  };

  const setIsOpen = (open) => {
    if (open) {
      dispatch({
        type: "open",
      });
    } else {
      dispatch({
        type: "close",
      });
    }
  };

  return (
    <RecorderContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Dialogue
        isOpen={state.dialogue}
        setIsOpen={setIsOpen}
        title={state.title}
      >
        <>
          <div className="mt-2 w-full mx-auto">
            {state.status === "recording" && (
              <>
                <div className="flex">
                  <video ref={videoRef} className="w-full h-full" autoPlay />
                </div>
                <div className="flex mt-2">
                  <button
                    className="rounded-sm bg-blue-400 text-white py-2 px-4"
                    onClick={onStopRecording}
                  >
                    Stop Recording
                  </button>
                  <Timer
                    stopRecording={onStopRecording}
                    recorderStatus={status}
                    currentTime={videoRef.current?.currentTime}
                  />
                </div>
              </>
            )}

            {state.status === "idle" && (
              <div className="mt-2">
                <button
                  className="rounded-sm bg-blue-400 text-white py-2 px-4"
                  onClick={onRecord}
                >
                  Start Recording
                </button>
                <button
                  className="rounded-sm ml-3 bg-blue-400 text-white py-2 px-4"
                  onClick={onRecord}
                >
                  Max Time: 2 mins
                </button>
              </div>
            )}

            {state.status === "playback" && (
              <>
                <video
                  src={mediaBlobUrl}
                  width={500}
                  height={500}
                  autoPlay={false}
                  controls
                />
                <button
                  className="rounded-sm bg-blue-400 text-white py-2 px-4 mt-2"
                  onClick={() => onUpload(mediaBlobUrl)}
                >
                  {state.status === 'playback' && 'Upload Recording'}
                  {state.status === 'playback' && state.isUploading && 'Upload Recording'}
                </button>
              </>
            )}
          </div>
        </>
      </Dialogue>

      {children}
    </RecorderContext.Provider>
  );
};

export const useRecorder = () => {
  const recorder = useContext(RecorderContext);
  if (!recorder) {
    throw new Error(
      "Missing RecorderProvider. You can't use the hook, without the provider."
    );
  }
  return recorder;
};

export default RecorderProvider;
