import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadDashboardMenu } from "@/utils";
const Sidebar = async () => {
  const generalMenuArray = await loadDashboardMenu();

  return (
    <Tabs
      defaultValue="support"
      orientation="horizontal"
      className="flex mt-10"
    >
      <div className="xl:min-w-[368px] pl-12 pr-4">
        <TabsList className="flex flex-col h-full">
          <h1 className="text-lg text-left font-bold text-black mb-4 w-full">
            General
          </h1>
          {generalMenuArray.map((menu) =>
            menu.submenu ? (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={menu.menu}
              >
                <AccordionItem value={menu.menu}>
                  <AccordionTrigger className="px-6 group border-none text-left font-medium text-primary-950 flex justify-between w-full h-12 2xl:h-14 mb-3 hover:bg-primary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <menu.icons className=" text-black" size={24} />
                      <span className="font-medium">{menu.menu}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {menu.submenu.map((submenu) => (
                      <TabsTrigger
                        key={submenu.menu}
                        className="group border-none text-left font-medium text-primary-950 flex items-center gap-3 w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950"
                      >
                        <span className="font-medium">{submenu.menu}</span>
                      </TabsTrigger>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <TabsTrigger
                key={menu.menu}
                value={menu.value}
                className="group border-none text-left font-medium text-primary-950 flex items-center gap-3 w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950 rounded-lg px-6"
              >
                <menu.icons size={24} />
                <span className="font-medium">{menu.menu}</span>
              </TabsTrigger>
            )
          )}
        </TabsList>
      </div>

      <TabsContent value="support" className="w-full">
        <h1>Support</h1>
      </TabsContent>
    </Tabs>
  );
};

export default Sidebar;
