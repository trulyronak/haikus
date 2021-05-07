// import { syllable } from 'syllable'
import * as options from "./words"
const ONE_SYLLABLE_CATCH_ALL = 'um'

// https://stackoverflow.com/a/51175267
const syllablesForWord = (word: string): number => {
    word = word.toLowerCase();                                     
    word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');   
    word = word.replace(/^y/, '');                                 
    //return word.match(/[aeiouy]{1,2}/g).length;   
    var syl = word.match(/[aeiouy]{1,2}/g);

    if(syl)
    {
        return syl.length;
    } else {
		return 0;
	}
}

// const syllablesForWord = syllable;

const phraseWithSyllables = (syllables: number): string => {
	switch (syllables) {
		case 1: return ONE_SYLLABLE_CATCH_ALL;
		case 2: return '(why though?)'
		case 3: return '(bruh moment)'
		case 4: return '(actually)'
		case 5: return '- wait a second there'
		case 6: return '- just finishing this up'
		default: return ""
	}
}

const syllableForIndex = (index: number): number => {
	switch (index % 3) {
		case 1: return 7;
		default: return 5;
	}
}

const paragraphToHaiku = (text: string): string => {
	const lines: string[] = []
	const words = text.split(' ');

	let line = "", syllables = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];

		const lineIdx = lines.length;
		const requiredSyllablesForLine = syllableForIndex(lineIdx)
		const desiredSyllables = requiredSyllablesForLine - syllables;
		const syllablesInWord = syllablesForWord(word)

		if (syllablesInWord > 7) {
			continue; // omit the word TODO: split word somehow
		} else if (syllablesInWord > desiredSyllables) {
			line += (" " + phraseWithSyllables(desiredSyllables));
			syllables += desiredSyllables;
			i--; // reuse the word
		} else {
			line += (" " + word);
			syllables += syllablesInWord;
		}

		if (syllables === requiredSyllablesForLine) {
			lines.push(line);
			line = "";
			syllables = 0;
		}
	}

	if (line !== "") { // the story must be told
		const syllablesLeft = syllableForIndex(lines.length) - syllables;
		line += (" " + phraseWithSyllables(syllablesLeft));
		lines.push(line);
		line = "";
		syllables = 0;
	}

	// TODO: Add filler haiku

	for (const line of lines) {
		console.log(`${line} | ${line.split(' ').reduce((acc, curr) => syllablesForWord(curr) + acc, 0)}`)
	}

	return lines.join("\n")
}

// console.log(syllablesForWord(` "Hi 'hungry'" it started as. That's`))

// const result = paragraphToHaiku(`Heyo it's your boi ronak shah here back with another lets play`)
// console.log(result)
// console.log(paragraphToHaiku(options.dadJoke))
console.log(paragraphToHaiku(options.dadJoke))