import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const getBaseUrl = 
// () => {
//   return process.env.REACT_APP_ENV === "production"
//     ? 
    "https://api.up2dateonline.com/api"
//     : "http://localhost:8000/api";
// };

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl
  //baseUrl: getBaseUrl()
  ,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.user?.token ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
