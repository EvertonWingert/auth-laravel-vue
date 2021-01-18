export function handleErrors(err) {
    if (err.response) {
        console.log("Erro de response: " + err.response);
    } else if (err.request) {
        console.log("Erro de request: " + err.request);
    } else {
        console.log("Error", err.message);
    }
}
