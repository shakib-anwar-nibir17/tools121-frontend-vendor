import { BASE_URL } from '@/constant/urls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['userinfo', 'productCat', 'productlist', 'productrequestlist', 'quotationlist', 'supplierreviewlist'],
  endpoints: () => ({}),
});