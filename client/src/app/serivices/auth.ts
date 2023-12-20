//client
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
    deviceIsLogin: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/deviceIdLogin",
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
    removeUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/user/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useDeviceIsLoginMutation,
  useCurrentQuery,
  useGetAllUsersQuery,
  useRemoveUserMutation,
} = authApi;

export const {
  endpoints: {
    login,
    register,
    current,
    getAllUsers,
    removeUser,
    deviceIsLogin,
  },
} = authApi;
