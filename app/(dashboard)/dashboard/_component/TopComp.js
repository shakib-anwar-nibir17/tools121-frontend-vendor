"use client";

import TopSellingItems from '@/components/Dashboard/DashboardPage/TopSellingItems'
import TopTrendingProducts from '@/components/Dashboard/DashboardPage/TopTrendingProducts'
import React from 'react'

const TopComp = ({loadMoreHandler, totalData, items}) => {
  return (
    <div className="mt-10 flex gap-5">
        <TopSellingItems loadMoreHandler={loadMoreHandler} totalData={totalData} items={items} />
        {/* <TopTrendingProducts loadMoreHandler={topTrendingProductLoadMore} totalData={topTrendingProduct?.data?.paginate?.total} items={allTrendingProduct} /> */}
      </div>
  )
}

export default TopComp