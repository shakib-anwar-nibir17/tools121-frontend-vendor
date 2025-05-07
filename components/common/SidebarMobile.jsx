"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadDashboardMenu, loadSettingsMenu } from "@/utils";
import Link from "next/link";
import LogoutButtonSidebar from "./LogoutButtonSidebar";
import { useEffect, useState } from "react";

const SidebarMobile = ({ setOpen }) => {
  // Initialize state for menu items
  const [generalMenu, setGeneralMenu] = useState([]);
  const [settingsMenu, setSettingsMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load menu data when component mounts
  useEffect(() => {
    // Load dashboard menu
    loadDashboardMenu()
      .then((result) => {
        setGeneralMenu(result);
      })
      .catch((error) => {
        console.error("Failed to load dashboard menu:", error);
      });

    // Load settings menu
    loadSettingsMenu()
      .then((result) => {
        setSettingsMenu(result);
      })
      .catch((error) => {
        console.error("Failed to load settings menu:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Create the combined menu array from state
  const combinedMenuArray = [
    { title: "General", items: generalMenu },
    { title: "Settings", items: settingsMenu },
  ];

  // Show loading state or empty sidebar while data is loading
  if (loading) {
    return (
      <aside className="border-r-2 border-slate-200 hidden xl:block">
        <div className="xl:min-w-[368px] pl-12 pr-4">
          <p className="mt-10">Loading menu...</p>
        </div>
      </aside>
    );
  }

  return (
    <div className="xl:hidden">
      <Tabs defaultValue="dashboard" orientation="horizontal" className="flex">
        <div className="w-[300px] overflow-hidden">
          <TabsList className="flex flex-col h-full">
            {combinedMenuArray.map((menuSection) => (
              <>
                <h1 className="text-lg text-left font-bold text-black mb-4 w-full mt-10">
                  {menuSection.title}
                </h1>
                {menuSection.items.map((menu) =>
                  menu.submenu ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue=""
                      key={menu.menu}
                    >
                      <AccordionItem value={menu.menu}>
                        <AccordionTrigger className="px-6 group border-none text-left font-medium text-primary-950 flex justify-between w-full h-12 2xl:h-14 mb-3 hover:bg-primary-50 rounded-lg data-[state=open]:bg-primary-50">
                          <div className="flex items-center gap-3">
                            <menu.icons className=" text-black" size={24} />
                            <span className="font-medium">{menu.menu}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {menu.submenu.map((submenu) => (
                            <Link
                              className="w-full"
                              key={submenu.name}
                              href={`/${submenu.subRoute}`}
                            >
                              <TabsTrigger
                                value={submenu.value}
                                className="ml-10 px-6 group border-none text-left font-medium text-primary-950 flex items-center gap-3 justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950 rounded-lg min-w-[254px]"
                              >
                                <span
                                  onClick={() => setOpen(false)}
                                  className="font-medium text-base"
                                >
                                  {submenu.name}
                                </span>
                              </TabsTrigger>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      onClick={() => setOpen(false)}
                      className="w-full"
                      key={menu.menu}
                      href={`/${menu.route}`}
                    >
                      <TabsTrigger
                        value={menu.value}
                        className="group border-none text-left font-medium text-primary-950 w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950 rounded-lg px-6 gap-3"
                      >
                        <menu.icons size={24} />
                        <span className="font-medium text-base">
                          {menu.menu}
                        </span>
                      </TabsTrigger>
                    </Link>
                  )
                )}
              </>
            ))}

            <LogoutButtonSidebar />
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default SidebarMobile;
