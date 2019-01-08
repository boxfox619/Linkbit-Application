export default encoding = (data) => {
    const formBody = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        let value = data[property];
        if (typeof data === 'object') {
            value = JSON.stringify(value)
        }
        const encodedValue = encodeURIComponent(value);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}