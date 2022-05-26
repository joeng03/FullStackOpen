const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part}></Part>
    ))}
  </>
);
const Course = ({ name, parts }) => {
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </>
  );
};
export default Course;
