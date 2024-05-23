import Sdk from "./sdk/sdk.js"
import {sendFormData} from "./api/api.js"

document.getElementById("form-id").addEventListener("submit", async (event) => {
    event.preventDefault()
    const button = document.getElementById("id-button")

    button.style.background = "red"
    button.innerText = "Request is Sent"

    const formData = new FormData(event.target);

    await sendFormData(formData, event.target.action, event.target.method).then(html => {
        document.body.innerHTML = html;

        document.getElementById("button-viewDeal-id").addEventListener("click", async (event) => {
            const dealId = event.target.dataset.dealId
            await Sdk.redirectToNewDeal(dealId)
        })

    }).catch((error) => {
        console.error('Error:', error);
    });

    button.style.background = "white"
    button.innerText = "send"

})
