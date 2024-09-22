/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetAllDataResponse {
  id: number;
  name: string;
  gender: 'male' | 'female';
  mobile: string;
  active: boolean;
}

const mockDataAPI = createApi({
  reducerPath: "mockdata",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66cc16844290b1c4f19bdba1.mockapi.io",
  }),
  endpoints: (builder) => ({
    getAllData: builder.query<GetAllDataResponse[], void>({
      query: () => `/data`,
    }),
    deleteDetail: builder.mutation<void, number>({
      query: (detailId) => ({
        url: `/data/${detailId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default mockDataAPI;
export const { useGetAllDataQuery, useDeleteDetailMutation } = mockDataAPI;
export type {GetAllDataResponse};
