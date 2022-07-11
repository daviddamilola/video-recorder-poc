import RecorderProvider, { useRecorder } from "./context";

const RecordButton = () => {
    const { dispatch, state} = useRecorder()
    return !state.dialogue ? (
        <button
          onClick={() => {
            dispatch({ type: "open" });
          }}
        >
          Open Recorder
        </button>
      ): null
}

const RecordView = () => {
  return (
    <RecorderProvider>
        <RecordButton />
    </RecorderProvider>
  );
};

export default RecordView