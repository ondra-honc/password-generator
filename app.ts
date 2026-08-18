function generateSecureBytes(size: number): Uint8Array {
    const array = new Uint8Array(size);
    globalThis.crypto.getRandomValues(array);
    return array;
}

function generatePassword(length: number, uppercaseLetter?: boolean, numbers?: boolean, symbols?: boolean): string {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allowedChars = lowercaseChars;
    if (uppercaseLetter) allowedChars += uppercaseChars;
    if (numbers) allowedChars += numberChars;
    if (symbols) allowedChars += symbolChars;

    const array = generateSecureBytes(length);
    let password = '';
    
    for (let i: number = 0; i < array.length; i++) {
        const randomIndex = array[i]! % allowedChars.length;
        password += allowedChars[randomIndex];
    }

    return password
}

const copyButton = document.getElementById("copy-button") as HTMLButtonElement;
const generateButton = document.getElementById("generate") as HTMLButtonElement;
const outputPassword = document.getElementById("outputarea") as HTMLOutputElement;

copyButton.addEventListener('click', () => {
    const text = outputPassword.textContent?.trim() || "";

    if (text === "Here will be your password" || text === '') return;

    navigator.clipboard.writeText(text);
})

generateButton.addEventListener('click', () => {
    const passwordLength = document.getElementById("password-length") as HTMLInputElement;
    const uppercase = document.getElementById("uppercase") as HTMLInputElement;
    const numbers = document.getElementById("numbers") as HTMLInputElement;
    const symbols = document.getElementById("symbols") as HTMLInputElement;

    outputPassword.textContent = generatePassword(Number(passwordLength.value), uppercase.checked, numbers.checked, symbols.checked);
})