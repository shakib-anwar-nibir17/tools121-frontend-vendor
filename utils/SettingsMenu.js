import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { LuNetwork } from "react-icons/lu";
import { MdStorefront } from "react-icons/md";

const SettingsMenu = [
  {
    menu: "Store Settings",
    icons: MdStorefront,
    submenu: [
      {
        name: "Profile-Settings",
        subRoute: "store-settings/profile-setting",
      },
    ],
    route: "store-settings",
  },
  {
    menu: "Employee",
    icons: LiaUserTieSolid,
    submenu: [],
    route: "employee",
  },
  {
    menu: "Vendor Network",
    icons: LuNetwork,
    value: "vendor-network",
    route: "vendor-network",
  },
  {
    menu: "System Preferences",
    icons: IoSettingsOutline,
    value: "system-preference",
    route: "system-preference",
  },
];

export default SettingsMenu;
