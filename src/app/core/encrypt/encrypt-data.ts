// import { createSign, createVerify } from "crypto";
import { Injectable } from "@angular/core";
import { priKey, privateKey, pubKey, publicKey } from "../config/encrypt-keys.config";
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptData {



  public encryption(signString: string): string {
    console.log(`goood ${signString}`);
    const encrypted = CryptoJS.AES.encrypt(signString, privateKey);
    return encrypted.toString();
  }

  public checkSignature(sign: string, signString: string): boolean {
    const decrypted = CryptoJS.AES.decrypt(sign, publicKey);
    const decryptedSignString = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedSignString === signString;
  }


  public decryptCardDetails(signString: string) {
    const decryptedBytes = CryptoJS.AES.decrypt(signString, privateKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }


  decryptData(encryptedData: string): string | boolean {
    try {
      // Assuming encryptedData is base64-encoded
      const ciphertextBytes = CryptoJS.enc.Base64.parse(encryptedData);

      // Decrypt using AES (you may need to adjust this based on your encryption method)
      const decryptedBytes = CryptoJS.AES.decrypt(
        {
          ciphertext: ciphertextBytes,
        } as CryptoJS.lib.CipherParams, // Explicitly cast to CipherParams
        CryptoJS.enc.Utf8.parse(privateKey),  // Use the key properly
        { mode: CryptoJS.mode.ECB }  // Use the mode properly
      );

      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      return false; // Decryption failed
    }
  }



  // public encryption(signString: string): string {
  //   const sign = createSign('RSA-MD5');
  //   sign.update(signString, 'utf8');
  //   sign.end();
  //   const signature = sign.sign(privateKey, 'base64');
  //   return signature;
  // }


  // public checkSignature(sign: string, signString: string): boolean {
  //   const verify = createVerify('RSA-MD5');
  //   verify.update(signString, 'utf8');
  //   verify.end();
  //   return verify.verify(publicKey, sign, 'base64');
  // }


}
