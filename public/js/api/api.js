async function sendFormData(formData, action, method) {
    return fetch(action, {
        method: method,
        body: formData
    }).then(response => response.text())
        .catch((error) => {
            console.error('Error:', error);
        })
}

export {sendFormData};
