import { useState } from "react";

const StatisticLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>{unit}</td>
    </tr>
  );
};

const Statistics = ({ answers, total, avg, positive }) => {
  const [hasFeedbackGiven, setHasFeedbackGiven] = useState(false);

  if (!hasFeedbackGiven && total > 0) {
    setHasFeedbackGiven(true);
  }

  return (
    <div>
      <h2>Statistics</h2>
      {hasFeedbackGiven && (
        <div>
          <table>
            <tbody>
              {answers.map((answer, i) => {
                return (
                  <StatisticLine
                    key={i}
                    text={answer.label}
                    value={answer.amount}
                  />
                );
              })}
              <StatisticLine key={3} text={"all"} value={total} />
              <StatisticLine key={4} text={"average"} value={avg} />
              <StatisticLine
                key={5}
                text={"positive"}
                value={positive}
                unit="%"
              />
            </tbody>
          </table>
        </div>
      )}
      {!hasFeedbackGiven && <p>No feedback given!</p>}
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getAnswers = () => {
    return [
      { label: "good", amount: good, numericValue: 1 },
      { label: "neutral", amount: neutral, numericValue: 0 },
      { label: "bad", amount: bad, numericValue: -1 },
    ];
  };

  /* 
  Get total number of feedbacks given
  */
  const getNumberofFeedback = (answers) => {
    let numberofFeedback = 0;
    answers.forEach((answer) => {
      numberofFeedback += answer.amount;
    });
    return numberofFeedback;
  };

  /* 
  Get average for feedbacks given
  */
  const getFeedbackAverage = (answers) => {
    let numberofFeedback = parseInt(getNumberofFeedback(answers));
    let feedbackNumericSum = 0;
    answers.forEach((ans) => {
      feedbackNumericSum += ans.numericValue * ans.amount;
    });

    return feedbackNumericSum / numberofFeedback;
  };

  /* 
  Return the percentage of positive feedbacks
  */
  const getPositiveFeedbackPercentage = (answers) => {
    let numberofFeedback = parseInt(getNumberofFeedback(answers));
    let positiveFeedbackNumericSum = 0;
    answers.forEach((ans) => {
      if (ans.label == "good") {
        positiveFeedbackNumericSum += ans.amount;
      }
    });
    return parseFloat(positiveFeedbackNumericSum / numberofFeedback) * 100;
  };

  let nextValue;
  const handleClick = (value) => {
    // console.log(value);
    switch (value) {
      case "good":
        nextValue = good + 1;
        setGood(nextValue);
        break;
      case "neutral":
        nextValue = neutral + 1;
        setNeutral(nextValue);
        break;
      case "bad":
        nextValue = bad + 1;
        setBad(nextValue);
        break;
      default:
        console.log("Error: no value given!");
    }
  };

  let answers = getAnswers();
  let total = getNumberofFeedback(answers);
  let avg = getFeedbackAverage(answers);
  let positive = getPositiveFeedbackPercentage(answers);

  return (
    <div id="root">
      <h2>Give feedback</h2>
      <Button handleClick={() => handleClick("good")} text="good" />
      <Button handleClick={() => handleClick("neutral")} text="neutral" />
      <Button handleClick={() => handleClick("bad")} text="bad" />

      <Statistics
        answers={answers}
        total={total}
        avg={avg}
        positive={positive}
      />
    </div>
  );
};

export default App;
