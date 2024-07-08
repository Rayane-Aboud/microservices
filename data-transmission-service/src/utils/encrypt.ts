import * as crypto from 'crypto';
import * as base64 from 'base64-js';

const key = Buffer.from('NAMLA'.padEnd(32), 'utf-8');  // Ensure the key is 32 bytes for AES-256
const iv = crypto.randomBytes(16);


function encrypt(data: any, key: Buffer, iv: Buffer): { iv: string, encryptedData: string } {
    // Convert data to JSON string
    const jsonData = JSON.stringify(data);
    
    // Pad data to be a multiple of the block size
    const blockSize = 16;
    const paddingSize = blockSize - (jsonData.length % blockSize);
    const paddedData = Buffer.concat([Buffer.from(jsonData), Buffer.alloc(paddingSize, paddingSize)]);

    // Create AES cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt data
    const encryptedData = Buffer.concat([cipher.update(paddedData), cipher.final()]);

    // Return IV and encrypted data, both base64 encoded
    return {
        iv: iv.toString('base64'),
        encryptedData: encryptedData.toString('base64')
    };
}
