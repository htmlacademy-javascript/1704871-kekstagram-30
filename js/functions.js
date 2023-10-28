const convertTime = (time) => (parseInt((time.replaceAll(':', ',')), 10) * 60 + parseInt((time.split(':')[1]), 10));

const analiseMeetingTime = (startTime, finishTime, startMeeting, duration) => {
  if ((convertTime(startMeeting) + duration > convertTime(finishTime)) || (convertTime(startMeeting) < convertTime(startTime))) {
    return 'false';
  } else {
    return 'true';
  }
};

analiseMeetingTime('14:00', '17:30', '08:0', 90);
