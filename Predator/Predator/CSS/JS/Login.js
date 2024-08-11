let form = document.getElementById("form")
// console.log(form);

let email = document.getElementById("email")
let password = document.getElementById("password")
let Clickhere1 = document.querySelector(".abc1")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateInput()
})



const setError = (element, message) => {
    const inputF = element.parentElement;
    const errorDisplay = inputF.querySelector(".error");

    errorDisplay.innerText = message

}

const setSuccess = (element, message) => {
    const inputF = element.parentElement;
    const successdisplay = inputF.querySelector(".error")
    
    successdisplay.innerText = message
}
const validateInput = () => {
    const emailvalue = email.value.trim()
    const passwordvalue = password.value.trim()


    var email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (emailvalue == "") {
        // alert("Email is Required")
        setError(email, "Email is Required")
    }
    else if (!emailvalue.match(email_check)) {
        // alert("Provide valid email address")
        setError(email, "Provide valid email address")
    }
    else {
        setSuccess(email, "")
    }

    if (passwordvalue == "") {
        // alert("Password is required")
        setError(password, "Password is required")
    }
    else if (passwordvalue.length < 8) {
        // alert("Password must be at least 8 character")
        setError(password, "Password must be at least 8 character")
    }
    else {
        setSuccess(password, "")
    }

}

Clickhere1.addEventListener('click', () => {
    window.location.href = "Registration.html"
})
