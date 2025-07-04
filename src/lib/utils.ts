import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ApiCallOptions, APIResponse, ArrayWithPage} from "@/lib/type";
import {GET_METHOD, HOST_API} from "@/lib/constants";
import {Session} from "@auth/core/types";
import {getTranslations} from "next-intl/server";

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
      console.log(`${HOST_API}${url}`)
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
export function timeUntilMidnight(): { hours: number; minutes: number } {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0) // Set to 12:00 AM (next day)

  const diff = midnight.getTime() - now.getTime() // Difference in milliseconds
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return {hours, minutes}
}

export const formatDateTime = (dateString: Date | null, local: string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    // weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  const formattedDateTime: string = dateString ? new Date(dateString).toLocaleString(
      local,
      dateTimeOptions
  ) : "Can't load date"
  const formattedDate: string = dateString ? new Date(dateString).toLocaleString(
      local,
      dateOptions
  ) : "Can't load date"
  const formattedTime: string = dateString ? new Date(dateString).toLocaleString(
      local,
      timeOptions
  ) : "Can't load date"
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export async function callApiToArrayWithPage<T>({url, method, body, headers}: ApiCallOptions): Promise<APIResponse<ArrayWithPage<T>>> {
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
    console.log(`${HOST_API}${url}`)
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

export async function throwSessionError<T>(): Promise<APIResponse<T>> {
  const t = await getTranslations()
  return {
    success: false,
    message: t('Error.unauthorized'),
    data: null
  }
}

export const generateHeaderAccessToken = (session: Session) => {

  return {
    'Authorization': `Bearer ${session.accessToken}`,
  };
}

export function getPagination(page: number, totalPages: number, delta = 0) {
  const range: number[] = [];
  const rangeWithDots: (number)[] = [];
  let l: number|undefined = undefined;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      range.push(i);
    }
  }
  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
       // if the difference between current page and last page is 2, add current page + 1 to rangeWithDots
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
       // if between two pages is greater than 2, add -1 to indicate "..."
        rangeWithDots.push(-1*i);
      }
    }
    // add page number to rangeWithDots
    rangeWithDots.push(i);
    // update l to current page number
    l = i;
  }
  // return array of page numbers and -1 for "..."
  return rangeWithDots;
}