function generateSecureBytes(size: number): Uint8Array {
    const array = new Uint8Array(size);
    globalThis.crypto.getRandomValues(array);
    return array;
}

const copyButton = document.getElementById("copy-button") as HTMLButtonElement;
const passwordLength = document.getElementById("password-length") as HTMLInputElement;
const uppercase = document.getElementById("uppercase") as HTMLInputElement;
const numbers = document.getElementById("numbers") as HTMLInputElement;
const symbols = document.getElementById("symbols") as HTMLInputElement;

copyButton.addEventListener('click', () => {
    const outputPassword = document.getElementById("outputarea") as HTMLOutputElement;
    const text = outputPassword.textContent?.trim() || "";

    if (text === "Here will be your password" || text === '') return;

    navigator.clipboard.writeText(text);
})