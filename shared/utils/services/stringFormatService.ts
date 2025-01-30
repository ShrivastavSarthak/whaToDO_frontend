import { optionParams } from "../interfaces/apiInterface";

export function StringFormatService(str: string, args: string[]): string {
  if (!args) {
    return str;
  }
  return str?.replace(/{(\d+)}/g, (match, index) => args[index] || "");
}

export function UrlFormatService(data: optionParams[], prefixUrl: string) {
  const queryParams = data
    .map((params) => `${params.paramName}=${params.paramValue}`)
    .join("&");

  return `${prefixUrl}?${queryParams}`;
}

export function constructRoute(routeParams: string[]) {
  return routeParams.join("/");
}
