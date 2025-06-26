import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ApiCallOptions, APIResponse} from "@/lib/type";
import {GET_METHOD, HOST_API} from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function callApiToObject<T>({url, method, body, headers}: ApiCallOptions): Promise<APIResponse<T>> {
    try {
      const options: RequestInit = {
        method: method || GET_METHOD,
        headers: {
          // 'Accept-Language': local,
          ...(headers ? headers : {})
        },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(`${HOST_API}${url}`, options);
      return await response.json();

    }catch(error) {
      console.error(error);
      return {
        success: false,
        message: "An error occurred while calling the API.",
        data: null
      }
    }
}