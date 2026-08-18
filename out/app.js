"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array = new Uint8Array(16);
window.crypto.getRandomValues(array);
console.log("Secure random values:", array);
//# sourceMappingURL=app.js.map