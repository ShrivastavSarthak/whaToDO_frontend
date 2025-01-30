export interface ApiRequest {
  url: string;
  reqType: string;
  headers?: string;
}

export interface HttpRequest {
  httpResponse: ApiRequest;
  payload?: any;
}

export interface ResponseInterface {
  response: any;
  statusCode: number;
}

export interface ApiResponse {
  url: string;
  reqType: string;
  headers: string;
}

export interface optionParams {
  paramName: string;
  paramValue: string | number | null | boolean;
}
