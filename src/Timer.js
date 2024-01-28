import CircularProgress from "@mui/joy/CircularProgress";

export default function Timer({ timeLeft, totalTime, text }) {
  const part = (timeLeft / (totalTime * 60)) * 100;
  return (
    <div className="timer">
      <h2 id="timer-label">{text}</h2>
      <CircularProgress
        sx={{
          "--CircularProgress-size": "160px",
          "--CircularProgress-progressThickness": "10px",
          "--CircularProgress-trackThickness": "10px",
        }}
        determinate
        value={part}
        variant="soft"
      >
        <p id="time-left">
          {timeLeft === 3600
            ? "60:00"
            : new Date(timeLeft * 1000).toISOString().slice(14, 19)}
        </p>
      </CircularProgress>
    </div>
  );
}
