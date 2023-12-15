export const convertToPersianDate = (dateString: string): string => {
    const date = new Date(dateString);
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
    const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", options);
    return formatter.format(date);
};
