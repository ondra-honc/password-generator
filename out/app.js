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
function showNotification(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.innerText = message;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        backgroundColor: '#333',
        color: '#fff',
        padding: '1.75rem 2.5rem',
        borderRadius: '0.5rem',
        zIndex: '9999',
        boxShadow: '0 0.25rem 0.375rem rgba(0,0,0,0.1)'
    });
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
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
    let parsedNumber;
    if (Number.isNaN(parseInt(passwordLength.value))) {
        showNotification("Inputted length is not a number");
        return;
    }
    else {
        parsedNumber = parseInt(passwordLength.value);
    }
    if (parsedNumber <= 3) {
        showNotification("Please make sure the length is atleast 6 characters");
        return;
    }
    outputPassword.textContent = generatePassword(parsedNumber, uppercase.checked, numbers.checked, symbols.checked);
});
export {};
//# sourceMappingURL=app.js.map