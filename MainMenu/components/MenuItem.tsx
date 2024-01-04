"use client";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import Link from "next/link";
import React from "react";

interface MENU_ITEM {
  componentType: string;
  componentCode: string;
  componentName: string;
  componentIcon: string;
  componentDescription: string;
  componentRoute: string;
}

interface Props {
  menuItem: MENU_ITEM;
}

const MenuItem = ({ menuItem }: Props) => {
  const hiveComponents = useHiveComponentsContext();
  const { getChildComponents } = useHiveComponentsApi();

  const handleClick = (passedMenu: string) => {
    hiveComponents.setSelectedMenu(passedMenu);
    getChildComponents(menuItem.componentName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      onClick={() => handleClick(menuItem.componentName)}
      className="menu_item"
      href={menuItem.componentRoute}
    >
      <img alt="" src={menuItem.componentIcon} className="menu_icon" />
      <div
        className={`menu_item_ak ${
          hiveComponents.selectedMenu === menuItem.componentName
            ? "selected_menu"
            : "menu_text"
        }`}
      >
        <div>{menuItem.componentName}</div>
        {/* {menuItem.componentName === "Chat" && (
          <>{unreadMessages > 0 && <div className="readed_tab_badge" />}</>
        )} */}
      </div>
    </Link>
  );
};

export default MenuItem;
