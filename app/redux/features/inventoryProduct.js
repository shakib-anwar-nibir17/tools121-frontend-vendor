import { api } from "../api/api";

const invenntoryProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    productCategory: builder.query({
        query: (token) =>({
          url: '/categories/v1/list',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        providesTags: ['productCat'],
      }),

    productSubCategory: builder.query({
        query: (data) =>({
          url: `/sub-categories/v1/list?cat_id=${data?.cat_id}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data?.token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        // providesTags: ['productSubCat'],
      }),
    
    productBrand: builder.query({
        query: (token) =>({
          url: '/brand/v1/list',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        // providesTags: ['productCat'],
      }),
    
    productModel: builder.query({
        query: (token) =>({
          url: '/model/v1/list',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        // providesTags: ['productCat'],
      }),

    productEngine: builder.query({
        query: (token) =>({
          url: '/engine/v1/list',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        // providesTags: ['productCat'],
      }),

      selectProductList: builder.query({
        query: (data) =>({
          url: `/product/v1/list?sub_cat_id=${data?.sub_cat_id}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data?.token}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        // providesTags: ['productSubCat'],
      }),
      
  }),
});

export const {
    useProductCategoryQuery,
    useLazyProductSubCategoryQuery,
    useProductBrandQuery,
    useProductModelQuery,
    useProductEngineQuery,
    useLazySelectProductListQuery,
} = invenntoryProductApi;
