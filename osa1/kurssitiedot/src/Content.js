import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((val, i) => {
        return <Part key={i} name={val.name} exercise={val.exercises} />;
      })}
    </div>
  );
};

export default Content;
