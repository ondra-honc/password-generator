function getSecureCrypto() {
  const currentGlobal = globalThis as any;

  if (currentGlobal.crypto && typeof currentGlobal.crypto.getRandomValues === 'function') {
    return currentGlobal.crypto;
  }

  try {
    return require('crypto');
  } catch (e) {
    throw new Error("No API Found");
  }
}

function generateSecureBytes(size: number): Uint8Array {
  const cryptoAPI = getSecureCrypto();
  const array = new Uint8Array(size);
  
  if (typeof cryptoAPI.getRandomValues === 'function') {
    cryptoAPI.getRandomValues(array);
  } else if (typeof cryptoAPI.randomBytes === 'function') {
    const buffer = cryptoAPI.randomBytes(size);
    array.set(buffer);
  }
  
  return array;
}