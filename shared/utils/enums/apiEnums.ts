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

export enum AuthApiUrl {
  verifyEmailApiUrl = "user/users/forgetPwd?username={0}",
  verifyOtpApiUrl = "user/users/verifyOtp",
  resetPasswordApiUrl = "user/users/resetPwd",
}

export enum LoginApiUrls {
  childSignup = "user/signup",
  childSignin = "user/signin",
  parentSignup = "/pUser/parent-login",
  parentSignin = "/pUser/parent-signup",
}
//TODO: this will be going into project url
export enum ContactUsApiUrls {
  PostContact = "project/contacts",
  FetchAllContact = "project/contacts/project/{0}",
  FetchContactById = "project/contacts/{0}",
}

//TODO this is the confusing api which will be change in the future: THIS IS also in project and  routes are changed
export enum SendMessageApiUrls {
  PostMessage = "project/messages/post",
  SendTemplate = "project/templates/get",
  FetchContactById = "project/templates/getTemplateById/{0}",
}

export enum TemplatesApiUrls {
  GetTemplateTypesById = "project/types/project/{0}",
  PostTemplate = "chat/meta/template/create",
  GetAllTemplates = "project/templates/getAll",
  DeleteTemplate = "project/templates/delete/{0}",
  GetTemplatesByProjectId = "project/templates/project/{0}",
  GetTemplateLanguages = "project/languages/all",
  FetchTemplateCategories = "project/categories/all",
  FetchTemplateTypes = "project/types/all",
}
//PROJECT
export enum UploadApiUrls {
  UploadFile = "project/files/upload/excel",
}

export enum UserApiUrl {
  GetUser = "user/users/getById/{0}",
}
//project
export enum IndustriesApiUrl {
  GetAllIndustries = "user/industries/getAll",
}

export enum CompanyApiUrl {
  postCompanyDetails = "user/companies/post",
  fetchCompanyByUserId = "user/companies/getByUser/{0}",
}
//PROJECT
export enum ProjectApiUrl {
  createProject = "project/projects",
  getProjectByCompanyId = "project/projects/company/{0}",
  getProgressData = "project/projects/progress/{0}",
}

export enum MetaApiUrl {
  sendDummyMessage = "project/messages/template/post",
}

export enum FileApiUrl {
  uploadContactsFile = "project/file/upload",
}

export enum TagsApiUrls {
  fetchAllTags = "project/tags/all",
  saveBulkTag = "project/bulk",
}
