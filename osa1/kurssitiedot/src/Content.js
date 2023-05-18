import Part from "./Part";

const Content = ({ part, exercise }) => {
  return (
    <div>
      <Part part={part} exercise={exercise} />
    </div>
  );
};

export default Content;
