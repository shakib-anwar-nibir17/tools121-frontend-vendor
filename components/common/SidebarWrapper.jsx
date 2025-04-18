"use client";

import { useDeviceType } from "@/hooks/useDeviceType";

const SidebarWrapper = () => {
  const deviceType = useDeviceType();
  return <h1>You are using a {deviceType} device</h1>;
};

export default SidebarWrapper;
