export default encoding = (data) => {
    const formBody = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property)
        let value = data[property]
        if (typeof data === 'object') {
            value = JSON.stringify(value)
        }
        let encodedValue = encodeURIComponent(value)
        if (encodedValue.startsWith("%22") && encodedValue.endsWith("%22")) {
            encodedValue = encodedValue.substring(0, encodedValue.length-3)
            encodedValue = encodedValue.substring(3, encodedValue.length)
        }
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return formBody.join("&")
}