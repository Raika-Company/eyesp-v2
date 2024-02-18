/**
 * Converts a given date string to a formatted Persian date string.
 * @param {string} dateString - The date string to be converted.
 * @returns {string} - The formatted Persian date string.
 */
export const convertToPersianDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Configuration options for formatting the date in Persian
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        calendar: "persian",
        numberingSystem: "arabext",
        localeMatcher: "best fit",
    };

    // Create a formatter with the specified options
    const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", options);

    // Format the date and return the Persian date string
    return formatter.format(date);
};
