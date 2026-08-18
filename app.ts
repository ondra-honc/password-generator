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

function showNotification(message: string, duration = 3000): void {
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

    let parsedNumber: number;

    if (Number.isNaN(parseInt(passwordLength.value))) {
        showNotification("Inputted length is not a number");
        return;
    } else {
        parsedNumber = parseInt(passwordLength.value);
    }

    if (parsedNumber < 6 || parsedNumber > 128) {
        const text = parsedNumber < 6 
        ? "Please make sure the length is at least 6 characters" 
        : "Please make sure the length is maximally 128 characters";

        showNotification(text);
        return;
    }

    outputPassword.textContent = generatePassword(parsedNumber, uppercase.checked, numbers.checked, symbols.checked);
})