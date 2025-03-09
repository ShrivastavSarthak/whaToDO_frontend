export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export enum ApiStatus {
  OK = "OK",
  BAD = "Bad",
  ERROR = "Error",
  CONFLICT = "Conflict",
  FORBIDDEN = "Forbidden",
  UNAUTHORIZED = "Unauthorized",
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}


export enum LoginApiUrls {
  childSignup = "user/signup",
  childSignin = "user/signin",
  parentSignup = "/pUser/parent-login",
  parentSignin = "/pUser/parent-signup",
  childVerify = "/user/verify",
}

export enum childApiUrls{
  getChildById = "user/{0}",
  childResendEmail = "user/resend-verification-mail/{0}",
}