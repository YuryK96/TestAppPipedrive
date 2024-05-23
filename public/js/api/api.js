async function sendFormData(formData, action, method,userId) {
    return fetch(action, {
        method: method,
        body: formData,
        headers: {
            'userId': userId
        },
    }).then(response => response.text())
        .catch((error) => {
            console.error('Error:', error);
        })
}

export {sendFormData};
