import { BsBoxes, BsCart3 } from "react-icons/bs";
import { GrDocumentPerformance, GrDocumentText } from "react-icons/gr";
import { IoHeadsetOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiSquaresFour, PiUsersThreeLight } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const GeneralMenu = [
  {
    menu: "Dashboard",
    icons: PiSquaresFour,
    submenu: [],
  },
  {
    menu: "Quotation Request",
    icons: GrDocumentText,
    submenu: [],
  },
  {
    menu: "Orders",
    icons: BsCart3,
    submenu: [],
  },
  {
    menu: "Inventory",
    icons: BsBoxes,
    submenu: [],
  },
  {
    menu: "CRM",
    icons: PiUsersThreeLight,
    submenu: [],
  },
  {
    menu: "Traffic Analytics",
    icons: GrDocumentPerformance,
  },
  {
    menu: "Advertising",
    icons: LiaUserTieSolid,
    value: "advertising",
  },
  {
    menu: "Subscription",
    icons: TbReportSearch,
    value: "subscription",
  },
  {
    menu: "Support",
    icons: IoHeadsetOutline,
    value: "support",
  },
];

export default GeneralMenu;
