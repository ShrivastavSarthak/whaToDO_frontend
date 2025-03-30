"use client";
import { useEffect, useState } from "react";
import { useLazyGetMethodQuery } from "../services/dataServices";
import { ApiMethod } from "../enums/apiEnums";

export const useLazyGetApi = () => {
  const [data, setData] = useState<any>(null);

  const [trigger, { data: apiData, error, isLoading }] =
    useLazyGetMethodQuery();

  const getApi = async (url: string, headers?: string) => {
    console.log("api is calling");
    
    await trigger({
      httpResponse: {
        reqType: ApiMethod.GET,
        url: url,
        headers: headers,
      },
    });
  };

  
  
  useEffect(() => {
      if (apiData) {
          setData(apiData);
        }
    }, [apiData]);
  return { getApi, data, error, isLoading };
};
