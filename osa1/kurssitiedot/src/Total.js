const Total = ({ parts }) => {
  let exerciseNumber = 0;
  parts.forEach((parts) => {
    exerciseNumber += parts.exercises;
  });
  return <p>Number of exercises {exerciseNumber}</p>;
};

export default Total;
