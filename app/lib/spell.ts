import Typo from "typo-js";
import fs from "fs";
import path from "path";

// Singleton dictionary instance
let dictionary: Typo | null = null;

function loadDictionary(): Typo {
  if (!dictionary) {
    try {
      const baseDir = path.join(process.cwd(), "public", "dictionaries");
      
      // Try path 1: public/dictionaries/en_US.aff
      let affPath = path.join(baseDir, "en_US.aff");
      let dicPath = path.join(baseDir, "en_US.dic");

      // Try path 2: public/dictionaries/en_US/en_US.aff
      if (!fs.existsSync(affPath)) {
        affPath = path.join(baseDir, "en_US", "en_US.aff");
        dicPath = path.join(baseDir, "en_US", "en_US.dic");
      }

      if (!fs.existsSync(affPath) || !fs.existsSync(dicPath)) {
        throw new Error(`Dictionary files not found in ${baseDir}`);
      }

      const affData = fs.readFileSync(affPath, "utf-8");
      const dicData = fs.readFileSync(dicPath, "utf-8");

      dictionary = new Typo("en_US", affData, dicData);
    } catch (error) {
      console.error("Dictionary Load Error:", error);
      throw new Error("Failed to load dictionary. Please ensure en_US.aff and en_US.dic exist in public/dictionaries/");
    }
  }
  return dictionary;
}

export interface SpellingError {
  word: string;
  suggestions: string[];
  index?: number; 
}

export interface SpellCheckResult {
  errors: SpellingError[];
  stats: {
    characters: number;
    words: number;
    sentences: number;
    errorCount: number;
  };
}

export function checkSpelling(text: string): SpellCheckResult {
  const dict = loadDictionary();

  // 1. Clean the text
  // Replace Markdown symbols (#, -, *) and newlines with spaces to separate words clearly
  const cleanText = text.replace(/[#\-\*\n\r\t]/g, " ");

  // 2. Extract words
  // Matches words with apostrophes (e.g., don't, O'Connor)
  // \b ensures we match whole words
  const wordRegex = /\b[a-zA-Z]+('[a-zA-Z]+)?\b/g;
  const allMatches = cleanText.match(wordRegex) || [];
  
  const errors: SpellingError[] = [];
  const checkedCache = new Set<string>(); 

  // 3. Process each word
  for (const word of allMatches) {
    // Skip if already checked to improve performance
    if (checkedCache.has(word)) continue;
    
    // Skip single letters (except 'I' and 'a') to reduce false positives
    if (word.length === 1 && word !== "I" && word !== "a") continue;

    checkedCache.add(word);

    // Check spelling (check original casing, then lowercase)
    const isCorrect = dict.check(word) || dict.check(word.toLowerCase());

    if (!isCorrect) {
      const suggestions = dict.suggest(word);
      errors.push({
        word: word,
        suggestions: suggestions.slice(0, 5), // Top 5 suggestions
        index: -1 
      });
    }
  }

  // 4. Calculate Stats
  const stats = {
    characters: text.length,
    words: allMatches.length,
    // Rough sentence count estimation
    sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    errorCount: errors.length,
  };

  return { errors, stats };
}