export function convertToPersianNumbers(input: string | number): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input.toString().replace(/\d/g, (m) => persianDigits[parseInt(m, 10)]);
}
