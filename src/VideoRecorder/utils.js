export const formatTime = (secs) => {
    var date = new Date(0);
    date.setSeconds(secs);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };