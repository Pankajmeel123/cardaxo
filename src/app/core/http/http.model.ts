interface ResponseBase {
  status: number;
  msg: string;
  sign: string;
}

export interface SuccessfulResponse<T> extends ResponseBase {
  data: T;
}

export function isSuccessfulResponse<T>(
  object: any
): object is SuccessfulResponse<T> {
  return object.status == "OK";
}

export interface FailedResponse extends ResponseBase {
  message: any;
}

export function isFailedResponse<T>(
  object: any
): object is FailedResponse {
  return object.status == 'ERROR';
}

export type Response<T> = SuccessfulResponse<T> | FailedResponse;

export type ApiInfo = {
  baseUrl: string;
  token?: string;
}

export type ApiConfig = { [apiName: string]: ApiInfo }
