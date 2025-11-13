import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            register: builder.mutation({
                  query: (payload) => ({
                        url: "/user/register",
                        method: "POST",
                        data: payload
                  })
            }),
            login: builder.mutation({
                  query: (payload) => ({
                        url: "/auth/login",
                        method: "POST",
                        data: payload
                  })
            }),
            logout: builder.mutation({
                  query: () => ({
                        url: "/auth/logout",
                        method: "POST"
                  }),
                  invalidatesTags: ["USER"]
            }),
            userInfo: builder.query({
                  query: (payload) => ({
                        url: "/user/all-user",
                        method: "GET",
                        data: payload
                  }),
                  providesTags: ["USER"]
            })
      })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUserInfoQuery } = authApi;