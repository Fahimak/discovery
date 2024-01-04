"use client";
import {
  getChildComponentsApi,
  getHiveComponentsApi,
  getHiveDetailsApi,
} from "api/actions/Hive/hive";
import { useGlobalContext } from "context/config";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveContext } from "context/Hive/hive";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import { useProfileContext } from "context/Profile/profile";
import { usePathname, useRouter } from "next/navigation";

export const useHiveComponentsApi = () => {
  const globalState = useGlobalContext();
  const hiveState = useHiveContext();
  const profileState = useProfileContext();

  const componentsState = useHiveComponentsContext();

  const childCompState = useChildComponentsContext();

  const router = useRouter();

  const getHiveComponents = async (data: any) => {
    globalState.setIsLoading(true);
    try {
      const response = await getHiveComponentsApi(data);
      if (response.responseInfo.httpCode === 200) {
        componentsState.setAllMenuItems(response.data);

        componentsState.setUserMenuItems([]);
        componentsState.setNavbarItems([]);
        componentsState.setAdminMenuItems([]);
        componentsState.setHiveConfigItems([]);
        componentsState.userMenuItems = [];
        componentsState.adminMenuItems = [];
        componentsState.navbarItems = [];
        componentsState.hiveConfigItems = [];

        response.data.map((menu, idx) => {
          if (menu.componentType === "user_menu") {
            const menuExists = componentsState.userMenuItems.some(
              (userMenu) => JSON.stringify(userMenu) === JSON.stringify(menu)
            );

            if (!menuExists) {
              componentsState.setUserMenuItems((prevMenuItems) => [
                ...prevMenuItems,
                menu,
              ]);
            }
          }
          return 1;
        });
        response.data.map((menu, idx) => {
          if (menu.componentType === "admin_menu") {
            const menuExists = componentsState.adminMenuItems.some(
              (adminMenu) => JSON.stringify(adminMenu) === JSON.stringify(menu)
            );
            if (!menuExists) {
              componentsState.setAdminMenuItems((prevMenuItems) => [
                ...prevMenuItems,
                menu,
              ]);
            }
          }
        });

        response.data.map((menu, idx) => {
          if (menu.componentType === "hiveConfig") {
            const menuExists = componentsState.hiveConfigItems.some(
              (hiveMenu) => JSON.stringify(hiveMenu) === JSON.stringify(menu)
            );
            if (!menuExists) {
              componentsState.setHiveConfigItems((prevMenuItems) => [
                ...prevMenuItems,
                menu,
              ]);
            }
          }
        });

        response.data.map((menu, idx) => {
          if (
            menu.componentType === "primaryBtn" ||
            menu.componentType === "secondaryBtn"
          ) {
            const menuExists = componentsState.navbarItems.some(
              (navbarItem) =>
                JSON.stringify(navbarItem) === JSON.stringify(menu)
            );
            if (!menuExists) {
              componentsState.setNavbarItems((prevMenuItems) => [
                ...prevMenuItems,
                menu,
              ]);
            }
          }
        });

        return response;
      }
    } catch (error) {
      // Handle the error
    }
    globalState.setIsLoading(false);
  };

  const getChildComponents = async (
    pasedParent: string,
    passedUuid?: string
  ) => {
    componentsState.setIsLoading(true);
    const response = await getChildComponentsApi({
      organizationId: hiveState.hiveDetails?.communityId,
      parentComponentCode: pasedParent,
      channelUuid: passedUuid || "",
      isMemberView: profileState.isMemberView,
    });
    if (response.responseInfo.httpCode === 200) {
      childCompState.childComponents = response.data;
      childCompState.setChildComponents(response.data);

      setComponents();
      childCompState.childComponents.map((comp, idx) => {
        if (comp.componentType === "button")
          comp.componentType = "secondaryBtn";
      });
    }
    componentsState.setIsLoading(false);
  };

  const setComponents = () => {
    // childCompState.homeComponents = [];
    // childCompState.storyComponents = [];
    // childCompState.channelComponents = [];
    // childCompState.videoTabs = [];

    childCompState.childComponents.map((child, idx) => {
      if (child.parentComponentCode === "Channel") {
        if (child.componentType === "video_tabs") {
          const itemExists = childCompState.videoTabs.some(
            (videoTab) => JSON.stringify(videoTab) === JSON.stringify(child)
          );
          if (!itemExists) {
            childCompState.videoTabs.push(child);
            // childCompState.setVideoTabs((prevVideoTabs) => [
            //   ...prevVideoTabs,
            //   child,
            // ]);
          }
        } else {
          const itemExists = childCompState.channelComponents.some(
            (channelComponent) =>
              JSON.stringify(channelComponent) === JSON.stringify(child)
          );
          if (!itemExists) {
            childCompState.channelComponents.push(child);
            // childCompState.setChannelComponents((prevChannelComponents) => [
            //   ...prevChannelComponents,
            //   child,
            // ]);
          }
        }
      } else if (child.parentComponentCode === "Stories") {
        const itemExists = childCompState.storyComponents.some(
          (storyComponent) =>
            JSON.stringify(storyComponent) === JSON.stringify(child)
        );
        if (!itemExists) {
          childCompState.storyComponents = [child];
          childCompState.setStoryComponents([child]);
        }
      } else {
        const itemExists = childCompState.homeComponents.some(
          (homeComponent) =>
            JSON.stringify(homeComponent) === JSON.stringify(child)
        );
        if (!itemExists) {
          childCompState.setHomeComponents((prevHomeComponents) => [
            ...prevHomeComponents,
            child,
          ]);
        }
      }
    });
  };

  return { getHiveComponents, getChildComponents };
};

export default useHiveComponentsApi;
