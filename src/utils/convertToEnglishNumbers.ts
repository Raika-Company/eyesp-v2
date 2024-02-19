/**
 * Converts a Persian (Farsi) date string with Arabic numerals to English numerals.
 * @param {string} faDateString - The Persian date string with Arabic numerals.
 * @returns {string} - The converted date string with English numerals.
 */
export default function convertToEnglishNumbers(faDateString: string) {
  // Array mapping Arabic numerals to their corresponding English numerals
  const arabicNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Convert each character in the Persian date string to English numeral if it is an Arabic numeral
  const englishDate = faDateString
    .split("")
    .map((char) => {
      const index = arabicNums.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("");

  return englishDate;
}
