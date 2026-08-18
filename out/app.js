function generateSecureBytes(size) {
    const array = new Uint8Array(size);
    globalThis.crypto.getRandomValues(array);
    return array;
}
function generatePassword(length, uppercaseLetter, numbers, symbols) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let allowedChars = lowercaseChars;
    if (uppercaseLetter)
        allowedChars += uppercaseChars;
    if (numbers)
        allowedChars += numberChars;
    if (symbols)
        allowedChars += symbolChars;
    const array = generateSecureBytes(length);
    let password = '';
    for (let i = 0; i < array.length; i++) {
        const randomIndex = array[i] % allowedChars.length;
        password += allowedChars[randomIndex];
    }
    return password;
}
const copyButton = document.getElementById("copy-button");
const generateButton = document.getElementById("generate");
const outputPassword = document.getElementById("outputarea");
copyButton.addEventListener('click', () => {
    const text = outputPassword.textContent?.trim() || "";
    if (text === "Here will be your password" || text === '')
        return;
    navigator.clipboard.writeText(text);
});
generateButton.addEventListener('click', () => {
    const passwordLength = document.getElementById("password-length");
    const uppercase = document.getElementById("uppercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");
    outputPassword.textContent = generatePassword(Number(passwordLength.value), uppercase.checked, numbers.checked, symbols.checked);
});
export {};
//# sourceMappingURL=app.js.map