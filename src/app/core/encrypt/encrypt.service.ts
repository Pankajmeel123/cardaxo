import { Injectable } from '@angular/core';
import { SignFormatData } from './sign-format-data';
import { EncryptData } from './encrypt-data';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor(private signFormatData: SignFormatData, private encryptData: EncryptData) { }

  public encrypt(data: Record<string, any>): string {
    return this.encryptData.encryption(this.signFormatData.getSignString(data));
  }

  public verifyEncrypt(sign: string, data: Record<string, any>): boolean {
    return this.encryptData.checkSignature(sign, this.signFormatData.getSignString(data));
  }
}
