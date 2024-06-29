import { MdStorefront } from "react-icons/md";

const SettingsMenu = [
  {
    menu: "Profile-Settings",
    icons: MdStorefront,
    // submenu: [
    //   // {
    //   //   name: "Profile-Settings",
    //   //   subRoute: "store-settings/profile-settings/profile",
    //   //   value: "profile-settings",
    //   // },
    // ],
    value: "profile-settings",
    route: "profile-settings/profile",
  },
  // {
  //   menu: "Employee",
  //   icons: LiaUserTieSolid,
  //   submenu: [],
  //   route: "employee",
  // },
  // {
  //   menu: "Vendor Network",
  //   icons: LuNetwork,
  //   value: "vendor-network",
  //   route: "vendor-network",
  // },
  // {
  //   menu: "System Preferences",
  //   icons: IoSettingsOutline,
  //   value: "system-preference",
  //   route: "system-preference",
  // },
];

export default SettingsMenu;
