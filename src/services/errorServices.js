export const alertError = (err) => {
    if (err && err.response && err.response.data) {
        alert(err.response.data.error);
    } else {
        alert(err);
    }
}