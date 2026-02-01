import dayjs from "dayjs";

export const formatPrice = (price) => {
    return (price / 100).toFixed(2);
}

export const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
}