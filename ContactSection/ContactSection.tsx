"use client";
import LineBreak from "components/LineBreak/LineBreak";
import { AddContactSVG, EmailSVG, LocationSVG } from "components/SVG/SVG";
import { useHiveContext } from "context/Hive/hive";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ContactSection = () => {
  const hiveConfig = useHiveConfigContext();

  const hiveComponents = useHiveComponentsContext();

  const hive = useHiveContext();

  const { getContactInfo } = useHiveApi();

  useEffect(() => {
    getContactInfo();
  }, [hive.hiveUuid]);

  const router = useRouter();

  const handleEditContact = () => {
    router.push("/home/settings/about");
  };

  return (
    <div className="contact_section_container">
      {hiveComponents.hiveConfigItems.map((menu, idx) => {
        return (
          <div key={idx}>
            <div className="cu_header_wrapper">
              <h4>{menu.componentName}</h4>
            </div>
            <LineBreak />
            <div className="cu_address_email_wrapper">
              {!!hiveConfig.contactInfo?.address ? (
                <div className="cu_address_wrapper">
                  <LocationSVG />
                  <p className="text-sm w-75">
                    {hiveConfig.contactInfo?.address || ""}
                  </p>
                </div>
              ) : (
                <>
                  {!!menu.componentDescription && (
                    <div
                      onClick={handleEditContact}
                      className="contact_empty_add"
                    >
                      <AddContactSVG />
                      <p>Add Address</p>
                    </div>
                  )}
                </>
              )}
              {!!hiveConfig.contactInfo?.email ? (
                <div className="cu_address_wrapper">
                  <EmailSVG />
                  <p className="text-sm w-75">
                    {hiveConfig.contactInfo?.email || ""}
                  </p>
                </div>
              ) : (
                <>
                  {!!menu.componentDescription && (
                    <div
                      onClick={handleEditContact}
                      className="contact_empty_add"
                    >
                      <AddContactSVG />
                      <p>Add Email</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactSection;
