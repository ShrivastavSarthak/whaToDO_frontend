"use client";
import { ApiMethod } from "../enums/apiEnums";
import { usePostMethodMutation } from "../services/dataServices";
import { useAppSelector } from "./redux-hook";

export default function usePostApi() {
  const [postApi, { data, isError, isLoading, isSuccess }] = usePostMethodMutation();
  const user = useAppSelector((state) => state.user);
  const postApiCall = async ({
    url,
    method,
    payload,
  }: {
    url: string;
    method: ApiMethod;
    payload: any;
  }) => {
    await postApi({
      httpResponse: {
        reqType: method,
        url,
        headers: user.token,
      },
      payload,
    });
  };

  return { postApiCall, isError, isLoading, isSuccess, data };
}
