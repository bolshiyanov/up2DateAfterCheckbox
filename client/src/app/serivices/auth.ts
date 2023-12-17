import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/user/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery, useGetAllUsersQuery } = authApi;

export const {
  endpoints: { login, register, current, getAllUsers },
} = authApi;
