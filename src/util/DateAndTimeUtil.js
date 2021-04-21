import dateFormat from 'dateformat';

export const NextDay = () => {
    let day = new Date();
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;   
}

export const FormatDate = (date) => {
    return dateFormat(date, "yyyy-mm-dd")
}