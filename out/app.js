function generateSecureBytes(size) {
    const array = new Uint8Array(size);
    globalThis.crypto.getRandomValues(array);
    return array;
}
const copyButton = document.getElementById("copy-button");
const passwordLength = document.getElementById("password-length");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
copyButton.addEventListener('click', () => {
    const outputPassword = document.getElementById("outputarea");
    const text = outputPassword.textContent?.trim() || "";
    if (text === "Here will be your password" || text === '')
        return;
    navigator.clipboard.writeText(text);
});
export {};
//# sourceMappingURL=app.js.map