import { StatusCode } from "../enums/apiEnums";
import { optionParams, ResponseInterface } from "../interfaces/apiInterface";
import { UrlFormatService } from "./stringFormatService";

export const apiResponse = (
  url: string,
  reqType: string,
  headers: string,
  body?: Record<string, unknown>
) => {
  if (!body) {
    return {
      url,
      method: reqType,
      headers: {
        Authorization: `Bearer ${headers}`,
      },
    };
  }
  return {
    url,
    method: reqType,
    headers: {
      Authorization: `Bearer ${headers}`,
    },
    body,
    
  };
};

export const responseWrapper = async (response: any, meta: any) => {
  const statusCode = meta?.response?.status;

  if (statusCode !== StatusCode.UNAUTHORIZED) {
  }

  const result: ResponseInterface = {
    response: response,
    statusCode: statusCode,
  };
  return result;
};

export const ApiParameterFormatService = (
  data: optionParams[],
  prefixUrl: string
) => {
  return UrlFormatService(data, prefixUrl);
};
