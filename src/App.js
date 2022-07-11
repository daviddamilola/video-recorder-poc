import "./App.css";
import RecordView from "./VideoRecorder";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline text-red-600">
        Recorder demo
      </h1>
      <RecordView />
    </div>
  );
}

export default App;
