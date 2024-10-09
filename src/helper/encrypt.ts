import * as crypto from "crypto";

function encrypt(text: string | object): [string, string] {
  const algorithm = "aes-256-cbc";
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }

  const key = Buffer.from(encryptionKey, "hex");
  const iv = crypto.randomBytes(16);

  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes long");
  }

  const textToEncrypt = typeof text === "object" ? JSON.stringify(text) : text;

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(textToEncrypt, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Return the `iv` and `encryptedData` as a tuple (array)
  return [iv.toString("hex"), encrypted];
}

export { encrypt };
