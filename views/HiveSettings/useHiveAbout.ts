"use client";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import useHiveSettingsApi from "hooks/apiHooks/Hive/useHiveSettingsApi";
import { useEffect, useState } from "react";

interface UseAboutPageReturn {
  handleSave: any;
  editHiveForm: any;
  handleHiveForm: any;
}

export interface HiveFormObject {
  [key: string]: string | undefined;
  hiveName?: string;
  hiveDescription?: string;
  hiveAddress: string;
  hiveEmail: string;
  linkedinLink?: any;
  facebookLink?: any;
  twitterLink?: any;
  instagramLink?: any;
  whatsappLink?: any;
}

export const useAboutPageContext = (): UseAboutPageReturn => {
  const hiveSettings = useHiveSettingsContext();
  const hive = useHiveContext();
  const hiveConfig = useHiveConfigContext();

  useEffect(() => {
    hiveSettings.setTabsIdx(0);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [editHiveForm, setEditHiveForm] = useState<HiveFormObject>({
    hiveName: hive.hiveDetails?.communityName,
    hiveDescription: hive.hiveDetails?.longDescription,
    hiveAddress: hiveConfig.contactInfo?.address || "",
    hiveEmail: hiveConfig.contactInfo?.email || "",
    linkedinLink: hiveSettings.socialRoutes?.linkedinLink || "",
    facebookLink: hiveSettings.socialRoutes?.facebookLink || "",
    twitterLink: hiveSettings.socialRoutes?.twitterLink || "",
    instagramLink: hiveSettings.socialRoutes?.instagramLink || "",
    whatsappLink: hiveSettings.socialRoutes?.whatsappLink || "",
  });

  const handleHiveForm = (e: React.ChangeEvent<any>, limit: number) => {
    setEditHiveForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value.slice(0, limit),
    }));
  };

  const { editHiveDetails, saveContactInfo } = useHiveSettingsApi();

  const handleSave = () => {
    if (hiveDetails) {
      //   editHiveContext({
      //     organizationContext: hive.context,
      //     organizationName: hiveDetails.communityName,
      //     organizationUuid: hiveDetails.communityUuid,
      //     organizationId: hiveDetails.communityId,
      //   });

      editHiveDetails({
        communityName: editHiveForm.hiveName!,
        communityTier: "",
        communityLogo: "",
        communityBanner: "",
        marketPlace: hive.isPrivate ? "PRIVATE" : "COMMUNITY",
        longDescription: editHiveForm.hiveDescription!,
        communityUuid: hiveDetails?.communityUuid!,
        communitySubDomain: localStorage.getItem("subDomain")!,
        communityId: hiveDetails?.communityId!,
        communityBio: "",
        description: "",
        communityBioFlag: false,
        communityNameFlag: true,
        descriptionFlag: false,
        communityTierFlag: false,
        marketPlaceFlag: true,
        communityLogoFlag: false,
        communityBannerFlag: false,
        longDescriptionFlag: true,
        communityWebLogo: "",
        communityWebLogoFlag: false,
        introVideo: "",
        introVideoFlag: false,
        communitySubDomainFlag: false,
        showSuggested: hive.showSuggested,
        showSuggestedFlag: true,
        chatSupportEnabled: hive.showChatbot,
        chatSupportEnabledFlag: true,
      });
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          editHiveForm.hiveEmail
        )
      ) {
        editHiveForm.hiveEmail = "";
      }
      saveContactInfo(
        editHiveForm.hiveEmail || "",
        editHiveForm.hiveAddress || ""
      );
    }
  };

  const hiveDetails = hive.hiveDetails;

  return { handleSave, editHiveForm, handleHiveForm };
};
