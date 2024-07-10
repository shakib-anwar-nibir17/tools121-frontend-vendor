import { api } from "../api/api";

const invenntoryProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (token) =>({
        url: '/supplier/product/v1/list',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          "Accept-Language": "en",
        },
      }),
      providesTags: ['productlist'],
    }),

    getProducRequesttList: builder.query({
      query: (token) =>({
        url: '/supplier/product/v1/requested/list',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          "Accept-Language": "en",
        },
      }),
      providesTags: ['productrequestlist'],
    }),

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

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/supplier/product/v1/add",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
      invalidatesTags: ['productlist'],
    }),

    addProductRequest: builder.mutation({
      query: (data) => ({
        url: "/supplier/product/v1/request",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          // "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
        invalidatesTags: ['productrequestlist'],
    }),

    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `/supplier/product/v1/delete/${data?.prod_id}`,
        method: "DELETE", 
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
        invalidatesTags: ['productlist'],
    }),

    getSingleProductRequest: builder.query({
      query: (data) =>({
        url: `/supplier/product/v1/requested/details?product_id=${data?.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          "Accept-Language": "en",
        },
      }),
    }),

    updateReqProduct: builder.mutation({
      query: (data) => ({
        url: "/supplier/product/v1/requested/update",
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          // "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
        invalidatesTags: ['productrequestlist'],
    }),

    deleteRequstProduct: builder.mutation({
      query: (data) => ({
        url: `/supplier/product/v1/requested/delete/${data?.prod_id}`,
        method: "DELETE", 
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
        invalidatesTags: ['productrequestlist'],
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
    useAddProductMutation,
    useAddProductRequestMutation,
    useGetProductListQuery,
    useDeleteProductMutation,
    useGetProducRequesttListQuery,
    useLazyGetSingleProductRequestQuery,
    useUpdateReqProductMutation,
    useDeleteRequstProductMutation
} = invenntoryProductApi;
