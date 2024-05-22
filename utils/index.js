import "server-only";

const dashboardMenu = {
  menus: () => import("./GeneralMenu.js").then((module) => module.default),
};

export const loadDashboardMenu = async () => {
  const menus = await dashboardMenu.menus();
  console.log(menus);
  return menus;
};
