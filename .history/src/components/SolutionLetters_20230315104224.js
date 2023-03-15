import "../styles/Letters.scss";

const renderSolutionLetters = ({word, userLetters}) => {
  const wordLetters = word.split("");
  return wordLetters.map((letter, index) => {
    const exists = userLetters.includes(letter.toLocaleLowerCase());
    return (
      <li key={index} className="letter">
        {exists ? letter : ""}
      </li>
    );
  });
};

const SolutionLetters = ({ word, userLetters }) => {
  return (
    <div className="solution">
      <h2 className="title">Solución:</h2>
      <ul className="letters">{renderSolutionLetters()}</ul>
    </div>
  );
};

export default SolutionLetters;
