import { Inject, Injectable } from '@angular/core';
import { HttpModule } from './http.module';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiConfig, Response } from './http.model';
import { EncryptService } from '../encrypt/encrypt.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: HttpModule
})
export class HttpService {
  constructor(@Inject('API_CONFIG') private apiConfig: ApiConfig, private http: HttpClient, private encryptService: EncryptService) {
  }

  public setToken(apiName: string, token: string) {
    this.apiConfig[apiName].token = token;
  }

  public get<T>(api: string, path: string, params?: Record<string, any>) {
    const url = this.constructUrl(api, path);
    const headers = this.constructHeaders(api)
    return new Promise((yes, _) => {
      const httpEvent = this.http.get<Response<T>>(url, { headers: headers, params: params });
      httpEvent.subscribe({
        next: (response) => {
          yes(response);
        },
        error: (err) => {
          yes(err.error)
        }
      });
    });
  }

  public getUSD<T>(chain: string) {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${chain}&tsyms=USD`;
    return new Promise((yes, _) => {
      const httpEvent = this.http.get<Response<T>>(url);
      httpEvent.subscribe({
        next: (response) => {
          yes(response);
        },
        error: (err) => {
          yes(err.error)
        }
      });
    });
  }

  public post<T>(api: string, path: string, body: Record<string, any>) {
    const url = this.constructUrl(api, path);
    const headers = this.constructHeaders(api);
    if (api === 'hyper') {
      body = this.constructData(body);
      body['sign'] = this.encryptService.encrypt(body);
    }
    console.log(`gddsgfsd ${JSON.stringify(body)}`);
    console.log(`headers ${JSON.stringify(headers)}`);
    return new Promise((yes, _) => {
      const httpEvent = this.http.post<Response<T>>(url, body, { headers: headers });
      httpEvent.subscribe({
        next: (response) => {
          yes(response);
        },
        error: (err) => {
          yes(err.error)
        }
      });
    });
  }

  public put<T>(api: string, path: string, param: any) {
    const url = this.constructUrl(api, path);
    const headers = this.constructHeaders(api);
    return new Promise((yes, _) => {
      const httpEvent = this.http.put<Response<T>>(url, {}, { headers: headers, params: param });
      httpEvent.subscribe({
        next: (response) => {
          yes(response);
        },
        error: (err) => {
          yes(err.error)
        }
      });
    });
  }

  public delete<T>(api: string, path: string, param: any) {
    const url = this.constructUrl(api, path);
    const headers = this.constructHeaders(api);
    return new Promise((yes, _) => {
      const httpEvent = this.http.delete<Response<T>>(url, { headers: headers, params: param });
      httpEvent.subscribe({
        next: (response) => {
          yes(response);
        },
        error: (err) => {
          yes(err.error)
        }
      });
    });

  }

  private constructUrl(apiName: string, path: string): string {
    let base = this.apiConfig[apiName].baseUrl;
    if (!(base.endsWith('/') || base.endsWith('\\') || path.startsWith('/') || path.startsWith('\\')))
      base = `${base}/`;
    return `${base}${path}`;
  }

  private constructHeaders(apiName: string): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.apiConfig[apiName].token;
    console.log(`rrrrr ${token}  ${apiName}`);
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    headers = headers.append('Accept', 'application/json');

    return headers;
  }

  private constructData(data: Record<string, any>) {
    data['app_id'] = environment.appId;
    data['version'] = '1.0';
    data['key_version'] = 'admin';
    data['time'] = Math.floor(Date.now() / 1000);
    return data;
  }

}
