import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class VeriffService {
  private apiUrl = 'https://stationapi.veriff.com';
  private headers!: HttpHeaders;
  // '53d6c1e7-5573-4132-83ff-96da794e25df'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': 'c0492645-3428-4af7-8549-dcd6b9ec13a3'
    });

  }



  public async createSession(documentType: string) {
    const body = {
      verification:
      {
        callback: 'https://veriff.com',
        document: { type: documentType },
      }
    };
    return new Promise((yes, _) => {
      const httpEvent = this.http.post(this.apiUrl + '/v1/sessions/', body, { headers: this.headers });
      httpEvent.subscribe({
        next: (response) => {
          console.log(response);
          yes(response);
        },
        error: (err) => {
          console.log(err.error);
          yes(err.error)
        }
      });
    });

  }

  public async sendPhoto(sessionId: string, image: string, imageContext: string) {
    const body = {
      image:
      {
        context: imageContext,
        content: image
      }
    };
    const sign = this.generateHmacSignature(JSON.stringify(body));
    return new Promise((yes, _) => {
      const httpEvent = this.http.post(this.apiUrl + '/v1/sessions/' + sessionId + '/media', body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-AUTH-CLIENT': 'c0492645-3428-4af7-8549-dcd6b9ec13a3',
          'X-HMAC-SIGNATURE': sign
        })
      });
      httpEvent.subscribe({
        next: (response) => {
          console.log(response);
          yes(response);
        },
        error: (err) => {
          console.log(err.error);
          yes(err.error)
        }
      });
    });
  }

  public async submitSession(sessionId: string) {
    const body = {
      verification:
        { status: 'submitted' }
    };
    const sign = this.generateHmacSignature(JSON.stringify(body));
    return new Promise((yes, _) => {
      const httpEvent = this.http.patch(this.apiUrl + '/v1/sessions/' + sessionId, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-AUTH-CLIENT': 'c0492645-3428-4af7-8549-dcd6b9ec13a3',
          'X-HMAC-SIGNATURE': sign
        })
      });
      httpEvent.subscribe({
        next: (response) => {
          console.log(response);
          yes(response);
        },
        error: (err) => {
          console.log(err.error);
          yes(err.error)
        }
      });
    });

  }

  private generateHmacSignature(payload: any): string {

    // Use your preferred hashing algorithm and encoding method
    const signature = CryptoJS.HmacSHA256(payload, '8ec7776a-d501-4c7d-b943-e0c1e87595f5').toString(CryptoJS.enc.Hex);

    return signature;
  }


  public async getDecision(sessionId: string) {
    const sign = this.generateHmacSignature(sessionId);
    return new Promise((yes, _) => {
      const httpEvent = this.http.get(this.apiUrl + '/v1/sessions/' + sessionId + '/decision', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-AUTH-CLIENT': 'c0492645-3428-4af7-8549-dcd6b9ec13a3',
          'X-HMAC-SIGNATURE': sign
        })
      });
      httpEvent.subscribe({
        next: (response) => {
          console.log(response);
          yes(response);
        },
        error: (err) => {
          console.log(err.error);
          yes(err.error)
        }
      });
    });

  }


}



