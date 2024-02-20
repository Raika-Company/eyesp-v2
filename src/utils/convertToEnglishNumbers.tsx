export function convertToEnglishNumbers(input: string | number): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return input
    .toString()
    .replace(
      /[\u06F0-\u06F9]/g,
      (m) => englishDigits[persianDigits.indexOf(m)]
    );
}
