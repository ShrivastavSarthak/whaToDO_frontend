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
  childSignup = "child/signup",
  childSignin = "child/signin",
  parentSignup = "/pUser/parent-signup",
  parentSignin = "/pUser/parent-login",
}

export enum childApiUrls {
  getChildById = "child/{0}",
  childResendEmail = "child/resend-verification-mail/{0}",
  postChildTask = "api/v1/task/create_task",
}

export enum commonUrls{
  verifyUser = "user/verify",
}
export enum parentApiUrls{
  getParentById = "puser/{0}",
  parentResendEmail = "puser/resend-verification-mail/{0}",
}