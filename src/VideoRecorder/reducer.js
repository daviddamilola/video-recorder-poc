
export const initialState = {
    status: "idle", // 'idle', 'recording', 'playback'
    dialogue: false, // 'closed', 'open'
    recordedVideo: null,
    title: "Record a two mins video",
    uploading: false,
    error: null,
    success: false,
  };
  
  
  
export default function reducer(state, action) {
    switch (action.type) {
      case "onRecord":
        return {
          ...state,
          status: "recording",
        };
      case "stopRecord":
        return {
          ...state,
          status: "playback",
          title: "preview video recording",
        };
      case "open":
        return {
          ...state,
          dialogue: true,
        };
      case "beginUpload":
        return {
          ...state,
          recordedVideo: action.payload.videoBlob,
          uploading: true,
        };
      case "uploadSuccess":
        return {
          ...state,
          uploading: false,
          success: true,
        };
      case "uploadFailure":
        return {
          ...state,
          uploading: false,
          success: false,
          error: action.payload.error,
        };
      case "close":
        return { ...initialState, dialogue: false };
      case "reset":
        return initialState;
      default:
        return state;
    }
  }