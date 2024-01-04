"use client";
import { Components } from "api/models/Hive/hiveComponents";
import InitializeApp from "components/InitializeApp/InitializeApp";
import { useChannelContext } from "context/Channel/channel";
import { useProfileContext } from "context/Profile/profile";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface Props {
  button: Components;
  redirect?: string;
}

const Buttons: React.FC<PropsWithChildren<Props>> = ({
  button,
  children,
  redirect,
}) => {
  const profileState = useProfileContext();

  const router = useRouter();

  const channel = useChannelContext();

  const { launchLogin } = useHiveApi();

  const handleClick = () => {
    // if(button.componentName = "")
    if (button.accessType === "superadmin") {
      profileState.setIsMemberView(profileState.isMemberView);
      InitializeApp();
    }
    if (localStorage.getItem("isLoggedIn") === "yes") {
      if (!!redirect) {
        router.push(redirect);
      } else {
        if (button.componentName === "Members") {
          router.push("about");
          channel.setActiveTab(1);
        } else {
          router.push(button.componentRoute);
        }
      }
    } else {
      launchLogin();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${button.componentType}`}
    >
      {children}
    </div>
  );
};

export default Buttons;
