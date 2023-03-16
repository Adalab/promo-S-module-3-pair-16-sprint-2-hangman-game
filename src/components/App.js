import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";

import "../styles/Header.scss";
import Header from "./Header.js";
import Dummy from "./Dummy.js";
import SolutionLetters from "./SolutionLetters.js";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Instructions";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const number = getNumberOfErrors();

  return (
    <div className="page">
      <Header />
      <main className="main">
        <section>
          <SolutionLetters word={word} userLetters={userLetters} />
          <ErrorLetters word={word} userLetters={userLetters} />
          <Form handleLastLetter={handleLastLetter} lastLetter={lastLetter} />
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()} />
      </main>
      <Footer>
        <Routes>
          <Route path="/" element=""></Route>
          <Route path="/instructions" element={<Instructions />}></Route>
          <Route path="/options" element={<Options />}></Route>
        </Routes>
      </Footer>
    </div>
  );
}

export default App;
