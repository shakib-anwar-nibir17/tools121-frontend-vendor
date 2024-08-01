"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import NewUserChart from "../AnalyticCharts/NewUserChart";
import PageViewChart from "../AnalyticCharts/PageViewChart";
import UserChart from "../AnalyticCharts/UserChart";

const UserAnalytics = () => {
  const [option, setOption] = useState();

  useEffect(() => {
    const OpData = [
      {
        key: "Users",
        value: "users",
        amount: "15K",
      },

      {
        key: "New User",
        value: "new-user",
        amount: "1k",
      },
      {
        key: "Page Views",
        value: "page-views",
        amount: "20K",
      },
    ];

    setOption(OpData);
  }, []);
  return (
    <div className="h-[505px] w-[1122px] rounded-2xl shadow-lg">
      <Tabs defaultValue="users" className="w-[400px]">
        <TabsList className="gap-12 font-bold text-primary-950 p-0">
          {option?.map((option) => (
            <TabsTrigger
              key={option?.value}
              className="text-base pb-0 data-[state=active]:bg-white data-[state=active]:border-t-4 data-[state=active]:border-primary-900 hover:border-t-4 hover:border-primary-900 w-[132px] data-[state=active]:text-primary-900"
              value={option?.value}
            >
              <div className="flex flex-col mt-2">
                <p>{option?.key}</p>
                <p className="text-2xl  mt-4 ">{option?.amount}</p>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="users">
          <UserChart />
        </TabsContent>
        <TabsContent value="new-user">
          <NewUserChart />
        </TabsContent>
        <TabsContent value="page-views">
          <PageViewChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAnalytics;
