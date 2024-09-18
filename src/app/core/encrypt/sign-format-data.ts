import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SignFormatData {

  public getSignString(data: Record<string, any>): string {
    delete data["sign"];
    const keys = Object.keys(data).sort();
    let signStr = "";

    for (const key of keys) {
      if (typeof data[key] === "object") {
        signStr += `${key}=${this.arrayToString(data[key])}`;
      } else {
        if (signStr !== "") {
          signStr += `&${key}=${data[key]}`;
        } else {
          signStr = `${key}=${data[key]}`;
        }
      }
    }

    return signStr;
  }

  private arrayToString(data: any): string {
    let str = '';

    for (const item of data) {
      if (typeof item === "object") {
        str += this.arrayToString(item);
      } else {
        str += item;
      }
    }

    return str;
  }

}
