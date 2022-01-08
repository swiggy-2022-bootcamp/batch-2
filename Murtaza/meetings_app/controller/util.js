//TODO: better way of doing this !
const isSignUpRequestValid = (signUpRequestPayload) => {
    return ("firstName" in signUpRequestPayload)
            && ("lastName" in signUpRequestPayload)
            && ("emailAddress" in signUpRequestPayload)
            && ("username" in signUpRequestPayload)
            && ("password" in signUpRequestPayload);
}

const isLoginRequestValid = (loginRequestPayload) => {
    return ("username" in loginRequestPayload)
            && ("password" in loginRequestPayload)
}

module.exports = {
    isSignUpRequestValid: isSignUpRequestValid,
    isLoginRequestValid: isLoginRequestValid
}