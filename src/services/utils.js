export const MY = "my";
export const ADMIN = "admin";
export const USER = "user";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDateYYYYMMDD = (date) => {
    return date.split("T")[0];
}
export const getDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}