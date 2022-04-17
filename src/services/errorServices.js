export const alertError = (err) => {
    alert(err.response.data.error);
}