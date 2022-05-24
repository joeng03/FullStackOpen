import { useState } from "react";

const Button = ({ rating, onClick }) => (
  <button
    onClick={() => {
      onClick(rating);
    }}
  >
    {rating}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Feedback = ({ title, onClick }) => {
  return (
    <>
      <h1>{title}</h1>
      <Button rating="good" onClick={onClick}></Button>
      <Button rating="neutral" onClick={onClick}></Button>
      <Button rating="bad" onClick={onClick}></Button>
    </>
  );
};

const Statistics = ({ title, good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = ((good / all) * 100).toString() + "%";

  return (
    <>
      <h1>{title}</h1>
      {all === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const unicafe = {
    feedback_title: "Give feedback",
    statistics_title: "Statistics",
  };
  const procFeedback = (rating) => {
    rating === "neutral"
      ? setNeutral(neutral + 1)
      : rating === "good"
      ? setGood(good + 1)
      : setBad(bad + 1);
  };
  return (
    <div>
      <Feedback title={unicafe.feedback_title} onClick={procFeedback} />
      <Statistics
        title={unicafe.statistics_title}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
