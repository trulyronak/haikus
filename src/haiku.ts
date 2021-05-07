import { syllable } from "syllable";

const ONE_LAST_LINE = "Thank you very much";
const TWO_MORE_LINES_FIRST = "antidisestablishment";
const TWO_MORE_LINES_SECOND = "refrigerator";
const syllablesForWord = syllable;

const phraseWithSyllables = (syllables: number): string => {
  switch (syllables) {
    case 1:
      return "uh";
    case 2:
      return "(why though?)";
    case 3:
      return "(bruh moment)";
    case 4:
      return "(actually)";
    case 5:
      return "- wait a second there";
    case 6:
      return "- just finishing this up";
    default:
      return "";
  }
};

// 0 % 3 = 0
// 1 % 3 = 1
// 2 % 3 = 2
// 3 % 3 = 0

const syllableForIndex = (index: number): number => {
  switch (index % 3) {
    case 1:
      return 7;
    default:
      return 5;
  }
};

export const paragraphToHaiku = (text: string): string => {
  const lines: string[] = [];
  const words = text.split("\n").join("").split(" ");
  let lineIdx = 0;

  let line = "",
    syllables = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    const requiredSyllablesForLine = syllableForIndex(lineIdx);
    const desiredSyllables = requiredSyllablesForLine - syllables;
    const syllablesInWord = syllablesForWord(word);

    if (syllablesInWord > 7) {
      continue; // omit the word TODO: split word somehow
    } else if (syllablesInWord > desiredSyllables) {
      line += " " + phraseWithSyllables(desiredSyllables);
      syllables += desiredSyllables;
      i--; // reuse the word
    } else {
      line += " " + word;
      syllables += syllablesInWord;
    }

    if (syllables === requiredSyllablesForLine) {
      lines.push(line);
      line = "";
      syllables = 0;
      lineIdx++;
      if (lineIdx % 3 === 0 && lineIdx !== 0) {
        lines.push("");
      }
    }
  }

  if (line !== "") {
    // the story must be told
    console.log(`lastLine: ${line}`);
    const syllablesLeft = syllableForIndex(lineIdx) - syllables;
    console.log(syllablesLeft);
    line += " " + phraseWithSyllables(syllablesLeft);
    console.log(line);
    lines.push(line);
    line = "";
    syllables = 0;
    lineIdx++;
  }

  console.log(lineIdx)
  if (lineIdx % 3 === 2) {
    lines.push(ONE_LAST_LINE);
  } else if (lineIdx % 3 === 1) {
    lines.push(TWO_MORE_LINES_FIRST);
    lines.push(TWO_MORE_LINES_SECOND);
  }

  return lines.join("\n");
};
