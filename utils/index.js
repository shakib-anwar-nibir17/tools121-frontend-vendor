import "server-only";

const dashboardMenu = {
  menus: () => import("./GeneralMenu.js").then((module) => module.default),
};

export const loadDashboardMenu = async () => {
  const menus = await dashboardMenu.menus();
  console.log(menus);
  return menus;
};

const settingsMenu = {
  menus: () => import("./SettingsMenu.js").then((module) => module.default),
};

export const loadSettingsMenu = async () => {
  const menus = await settingsMenu.menus();
  console.log(menus);
  return menus;
};
