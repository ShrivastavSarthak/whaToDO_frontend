
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, responseWrapper } from "./apiResponse";
import { HttpRequest, ResponseInterface } from "../interfaces/api_interface";
import { baseUrl } from "../enums/apiEnums";

export const DataServices = createApi({
  reducerPath: "dataServices",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    postMethod: builder.mutation<ResponseInterface, HttpRequest>({
      query: (httpResponse: HttpRequest) => {
        return apiResponse(
          httpResponse.httpResponse.url,
          httpResponse.httpResponse.reqType,
          httpResponse.httpResponse.headers || "",
          httpResponse?.payload
        );
      },
      transformResponse: (response, meta) => responseWrapper(response, meta),
    }),
    getMethod: builder.query<ResponseInterface, HttpRequest>({
      query: (httpResponse: HttpRequest) => {
        return apiResponse(
          httpResponse.httpResponse.url,
          httpResponse.httpResponse.reqType,
          httpResponse.httpResponse.headers || ""
        );
      },
      transformResponse: (response, meta) => responseWrapper(response, meta),
    }),
  }),
});

export const { usePostMethodMutation, useGetMethodQuery, useLazyGetMethodQuery } = DataServices;
