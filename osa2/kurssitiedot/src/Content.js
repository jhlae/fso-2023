import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((val) => {
        return <Part key={val.id} name={val.name} exercise={val.exercises} />;
      })}
    </div>
  );
};

export default Content;
