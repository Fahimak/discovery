"use client";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import useHiveSettingsApi from "hooks/apiHooks/Hive/useHiveSettingsApi";
import { useEffect, useState } from "react";

interface UseMediaPageReturn {
  handleSave: any;
  removeHiveBanner: any;
  removeHiveLogo: any;
  handleChangeIntro: any;
  changeIntro: boolean;
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

export const useMediaPageContext = (): UseMediaPageReturn => {
  const hiveSettings = useHiveSettingsContext();
  const hive = useHiveContext();
  const hiveConfig = useHiveConfigContext();

  useEffect(() => {
    hiveSettings.setTabsIdx(1);
    hiveSettings.setBannerUrlChanged(false);
    hiveSettings.setUrlChanged(false);
    hiveSettings.setBannerUploaded(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { editHiveDetails } = useHiveSettingsApi();

  const handleSave = () => {
    editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: hiveSettings.mobileUrl,
      communityBanner: hiveSettings.bannerUrl,
      marketPlace: "",
      longDescription: "",
      communityUuid: hiveDetails?.communityUuid!,
      communitySubDomain: localStorage.getItem("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: hiveSettings.urlChanged,
      communityBannerFlag: hiveSettings.bannerUrlChanged,
      longDescriptionFlag: false,
      communityWebLogo: hiveSettings.webUrl,
      communityWebLogoFlag: hiveSettings.urlChanged,
      introVideo: hiveSettings.introUploadUrl
        ? hiveSettings.introUploadUrl
        : "",
      introVideoFlag: !!videoUpload.videoFile,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
    });
  };

  const [changeIntro, setChangeIntro] = useState(false);
  const videoUpload = useVideoUploadContext();

  const handleChangeIntro = () => {
    setChangeIntro((prevState) => !prevState);
    videoUpload.setVideoFile(null);
  };

  const removeHiveLogo = () => {
    editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: "",
      communityBanner: "",
      marketPlace: "",
      longDescription: "",
      communityUuid: hiveDetails?.communityUuid!,
      communitySubDomain: localStorage.getItem("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: true,
      communityBannerFlag: false,
      longDescriptionFlag: false,
      communityWebLogo: "",
      communityWebLogoFlag: true,
      introVideo: "",
      introVideoFlag: false,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
    });
  };

  const removeHiveBanner = () => {
    editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: "",
      communityBanner: "",
      marketPlace: "",
      longDescription: "",
      communityUuid: hiveDetails?.communityUuid!,
      communitySubDomain: localStorage.getItem("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: false,
      communityBannerFlag: true,
      longDescriptionFlag: false,
      communityWebLogo: "",
      communityWebLogoFlag: false,
      introVideo: "",
      introVideoFlag: false,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
    });
  };

  const hiveDetails = hive.hiveDetails;

  return {
    handleSave,
    removeHiveBanner,
    removeHiveLogo,
    handleChangeIntro,
    changeIntro,
  };
};
