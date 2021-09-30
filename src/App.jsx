import { useEffect, useState } from "react";
import "./App.css";

const loremText = `Дослідження показують, що імунітет до Covid-19 після двох етапів вакцинації поступово знижується. Чи ефективна третя доза вакцини? Яким видом вакцин її краще зробити? І чи потрібна буде ревакцинація тепер постійно?`;

function App() {
  const [wordsArray, setWordsArray] = useState(loremText.split(" "));
  const [word, setWord] = useState("");
  const [speed, setSpeed] = useState(60);
  const [range, setRange] = useState(60);

  let i = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setWord(wordsArray[i]);
      i++;
    }, (60 / speed) * 1000);
    return () => clearInterval(interval);
  }, [wordsArray, speed]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpeed(event.target[1].value);
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
              onChange={handleRangeChange}
            />
            <label>
              <span className="range-span purple">{range}</span>words per minute
            </label>
          </div>
          <input className="submit purple" type="submit" value="Read" />
        </div>
      </form>
      <hr />
      <div className="result-wrapper">
        <p className="result" style={{ animationDuration: `${60 / speed}s` }}>
          {word}
        </p>
      </div>
    </div>
  );
}

export default App;
