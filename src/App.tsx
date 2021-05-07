import React, { useState } from "react";
import { syllable } from "syllable";
import { paragraphToHaiku } from "./haiku";
import "./App.css";

const DEFAULT_TOOLTIP = `Don't believe it? Select a line to see how many syllables it is! (report bugs to contact@ronakshah.net)`;

function App() {
  const [input, setInput] = useState("");
  const [haiku, setHaiku] = useState("You haven't hit 'haikuify' yet!");
  const [tooltip, setTooltip] = useState(DEFAULT_TOOLTIP);

  const haikuify = () => {
    setHaiku(paragraphToHaiku(input));
    document.getElementById('haiku')?.scrollIntoView();
  };

  const haikuLines = haiku.split("\n");

  return (
    <div className="App">
      <h1>Anything to Haiku</h1>
      <p>because sounding things out is too hard</p>
      <h3>Anything</h3>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <p>{tooltip}</p>
      <div className="button-group">
        <button className="button" onClick={haikuify}>
          Haikuify!
        </button>
        <button
          className="button"
          onClick={() => navigator.clipboard.writeText(haiku)}
        >
          Copy to clipboard!
        </button>
      </div>

      <h3>Haiku Version</h3>
      <div id="haiku" className={haikuLines.length > 10 ? "haiku" : ""}>
        {haikuLines.map((line, key) => {
          const count = syllable(line);
          return (
            <div>
              <p
                onMouseEnter={() =>
                  setTooltip(`that line is ${count} syllables long`)
                }
                onMouseLeave={() => setTooltip(DEFAULT_TOOLTIP)}
              >
                {line}
              </p>
              {line === "" && <br />}
            </div>
          );
        })}
      </div>
      <p>
        Made by <a href="https://ronakshah.net">Ronak Shah</a> (not a web
        developer)
      </p>
      <p className="help">
        If you'd like to help out via cleaning this up / making it look nice /
        fixing bugs or just want to report an issue, checkout the{" "}
        <a href="https://github.com/trulyronak/haikus/issues">Github</a>
      </p>
    </div>
  );
}

export default App;
