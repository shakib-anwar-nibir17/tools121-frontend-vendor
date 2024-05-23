import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadDashboardMenu, loadSettingsMenu } from "@/utils";
import Link from "next/link";
const Sidebar = async () => {
  const generalMenuArray = await loadDashboardMenu();
  const settingsMenuArray = await loadSettingsMenu();

  const combinedMenuArray = [
    { title: "General", items: generalMenuArray },
    { title: "Settings", items: settingsMenuArray },
  ];

  return (
    <Tabs
      defaultValue="profile-settings"
      orientation="horizontal"
      className="flex"
    >
      <div className="xl:min-w-[368px] pl-12 pr-4 border-r-2 border-slate-200">
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
                    defaultValue="Store Settings"
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
                          <TabsTrigger
                            key={submenu.name}
                            value={submenu.value}
                            className="ml-10 px-6 group border-none text-left font-medium text-primary-950 flex items-center gap-3 justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950 rounded-lg w-[264px]"
                          >
                            <Link href={`/${submenu.subRoute}`}>
                              <span className="font-medium">
                                {submenu.name}
                              </span>
                            </Link>
                          </TabsTrigger>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <TabsTrigger
                    key={menu.menu}
                    value={menu.value}
                    className="group border-none text-left font-medium text-primary-950 w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950 rounded-lg px-6"
                  >
                    <Link
                      className="flex items-center gap-3"
                      href={`/${menu.route}`}
                    >
                      <menu.icons size={24} />
                      <span className="font-medium">{menu.menu}</span>
                    </Link>
                  </TabsTrigger>
                )
              )}
            </>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
};

export default Sidebar;
