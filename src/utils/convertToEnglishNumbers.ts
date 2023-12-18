export default function convertToEnglishNumbers(faDateString: string) {
  const arabicNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDate = faDateString
    .split("")
    .map((char) => {
      const index = arabicNums.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("");

  return englishDate;
}
