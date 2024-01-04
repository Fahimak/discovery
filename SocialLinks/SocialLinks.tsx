"use client";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import React, { useEffect } from "react";

const SocialLinks = () => {
  const hive = useHiveContext();
  const hiveCOnfig = useHiveConfigContext();

  const { getSocialLinks } = useHiveApi();

  const handleSocialClick = (route: string, go: boolean) => {
    go && window.open(route, "_blank");
  };

  const socialLinks = hiveCOnfig.socialLinks;

  useEffect(() => {
    hive.hiveUuid && getSocialLinks();
  }, [hive.hiveUuid]);

  return (
    <div className="social_icons_container">
      <h4>On the web</h4>
      {!!socialLinks && (
        <div className="social_icons_wrapper">
          {socialLinks.map((data, idx) => {
            return (
              <img
                key={idx}
                src={data.icon}
                className={`social_icon ${
                  data.isActive && data.route.length > 1
                    ? ""
                    : "inactive_social_icon"
                }`}
                alt="social"
                onClick={() => handleSocialClick(data.route, data.isActive)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
