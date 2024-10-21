import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { HttpService } from 'src/app/core/http/http.service';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  public async signIn(body: Record<string, any>) {
    return await this.http.post<IUser>('roynex', 'users/signIn', body);
  }

  public async sendCode(body: Record<string, any>) {
    return await this.http.post<String>('roynex', 'users/sendCode', body);
  }

  public async signInByEmail(body: Record<string, any>) {
    return await this.http.post<IUser>('roynex', 'users/signInByEmail', body);
  }

  public async signUpByEmail(body: Record<string, any>) {
    return await this.http.post<IUser>('roynex', 'users/signUpByEmail', body);
  }

  public async addUserKYC(body: Record<string, any>) {
    return await this.http.post<IUser>('roynex', 'users/addUserKyc', body);
  }

  public async addUserKycDetail(body: Record<string, any>) {
    return await this.http.post<IUser>('roynex', 'users/addUserKycDetail', body);
  }

  public async referralUserList() {
    return await this.http.get<IUser>('roynex', 'users/referralUserList');
  }

  public async userKycDetail() {
    return await this.http.get<IUser>('roynex', 'users/userKycDetail');
  }

  public async bannerList() {
    return await this.http.get<IUser>('roynex', 'common/bannerList');
  }

  public async coins() {
    return await this.http.post<IUser>('roynex', 'users/coin', {});
  }

  public async isLoggedIn(): Promise<boolean> {
    return !!(await Preferences.get({ key: 'token' })).value;
  }

  public async logout() {
    await Preferences.clear();
  }

  public async setTokenHttp() {
    const token = (await Preferences.get({ key: 'token' })).value;
    if (token)
      this.http.setToken("roynex", token);
  }
}
