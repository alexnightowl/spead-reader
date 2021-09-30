import { useEffect, useState } from "react";
import "./App.css";

const loremText = `Скорочте́ние это способность быстрого восприятия текстовой информации при использовании особых способов чтения. Обычная скорость чтения на русском языке у взрослого человека лежит в пределах 120–180 слов в минуту, по опытным исследованиям средняя скорость равняется 201 слову в минуту (при разбросе значений от 60 до 378) при среднем проценте усвоения 52. Под скорочтением понимают способность чтения в 3–4 раза быстрее средней скорости, максимально примерно до 600 слов в минуту. Существуют способы скорочтения, позволяющие достичь и более высоких скоростей, более 1000 слов в минуту. Скорочтение также играет важную роль в увеличении производительности труда в некоторых отраслях, например, для управленческого персонала. Считается, что некоторые люди могут овладеть способностью скорочтения без специальной подготовки, освоив способы быстрого чтения интуитивно.`;

function App() {
  const [wordsArray, setWordsArray] = useState(loremText.split(" "));
  const [word, setWord] = useState("Are you ready?");
  const [speed, setSpeed] = useState(60);
  const [range, setRange] = useState(60);
  const [readMode, setReadMode] = useState(false);

  let i = 0;
  useEffect(() => {
    if (readMode) {
      const interval = setInterval(() => {
        setWord(wordsArray[i]);
        i++;
        if (!wordsArray[i]) {
          setReadMode(false);
        }
      }, (60 / speed) * 1000);
      return () => clearInterval(interval);
    }
  }, [wordsArray, speed, readMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpeed(event.target[1].value);
    setReadMode(true);
    if (event.target[0].value) {
      setWordsArray(event.target[0].value.split(" "));
    }
    i = 0;
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="purple">Speed Reader</h1>
      <h3>
        Speed up your reading or read in a more convenient format several times
        faster
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea className="textarea" cols="130" rows="10" />
        <div className="controls">
          <div className="range-wrapper">
            <input
              type="range"
              min="60"
              max="600"
              step="10"
              value={range}
              onChange={handleRangeChange}
            />
            <label>
              <span className="range-span purple">{range}</span>words per minute
            </label>
          </div>
          <div>
            <input
              className="submit purple stop"
              type="button"
              value="Stop"
              onClick={() => setReadMode(false)}
            />
            <input className="submit purple" type="submit" value="Read" />
          </div>
        </div>
      </form>
      <hr />
      <div className="result-wrapper">
        <p className="result" style={{ animationDuration: `${60 / speed}s` }}>
          {word || "Are you ready?"}
        </p>
      </div>
    </div>
  );
}

export default App;
