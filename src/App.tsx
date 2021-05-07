import React, { useState } from "react";
import { syllable } from "syllable";
import { paragraphToHaiku } from "./haiku";
import "./App.css";

const DEFAULT_TOOLTIP = `Don't believe it? Select a line to see how many syllables it is! (report bugs to contact@ronakshah.net)`;

function App() {
  const [input, setInput] = useState("");
  const [haiku, setHaiku] = useState("");
  const [tooltip, setTooltip] = useState(DEFAULT_TOOLTIP);

  const haikuify = () => {
    console.log("running");
    setHaiku(paragraphToHaiku(input));
  };

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
      <button onClick={haikuify}>Haikuify!</button>
      <button onClick={() => navigator.clipboard.writeText(haiku)}>Copy to clipboard!</button>

      <h3>Haiku Version</h3>
      <div className="haiku">
        {haiku.split("\n").map((line, key) => {
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
			  {line === "" && <br/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
