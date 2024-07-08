import * as crypto from 'crypto';
import * as base64 from 'base64-js';


// Function to decrypt data
function decrypt(ivEncoded: string, encryptedData: string, key: Buffer): any {
    // Decode the base64 encoded IV and encrypted data
    const iv = Buffer.from(ivEncoded, 'base64');
    const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');

    // Create AES cipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt data
    const paddedData = Buffer.concat([decipher.update(encryptedDataBuffer), decipher.final()]);

    // Unpad data
    const paddingSize = paddedData[paddedData.length - 1];
    const jsonData = paddedData.subarray(0, paddedData.length - paddingSize).toString();

    // Convert JSON string back to JavaScript object
    const data = JSON.parse(jsonData);

    return data;
}
