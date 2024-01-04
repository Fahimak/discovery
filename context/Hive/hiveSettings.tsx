"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface SocialRoutes {
  [key: string]: string | undefined;
  linkedinLink: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  whatsappLink: string;
}

export interface HiveSettingsContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  urlChanged: boolean;
  setUrlChanged: Dispatch<SetStateAction<boolean>>;
  imageUploaded: boolean;
  setImageUploaded: Dispatch<SetStateAction<boolean>>;
  bannerUploaded: boolean;
  setBannerUploaded: Dispatch<SetStateAction<boolean>>;
  bannerUrlChanged: boolean;
  setBannerUrlChanged: Dispatch<SetStateAction<boolean>>;
  tabsList: string[];
  setTabsList: any;
  tabsIdx: number;
  setTabsIdx: any;
  pageNo: number;
  setPageNo: any;
  socialRoutes:
    | {
        [key: string]: string | undefined;
        linkedinLink: string;
        facebookLink: string;
        twitterLink: string;
        instagramLink: string;
        whatsappLink: string;
      }
    | undefined;
  setSocialRoutes: any;
  introUploadUrl: string;
  setIntroUploadUrl: any;
  mobileUrl: string;
  setMobileUrl: any;
  bannerUrl: string;
  setBannerUrl: any;
  webUrl: string;
  setWebUrl: any;
}

const HiveSettingsContext = createContext<HiveSettingsContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  urlChanged: false,
  setUrlChanged: (): boolean => false,
  imageUploaded: false,
  setImageUploaded: (): boolean => false,
  bannerUploaded: false,
  setBannerUploaded: (): boolean => false,
  bannerUrlChanged: false,
  setBannerUrlChanged: (): boolean => false,
  tabsList: ["About", "Media", "Members"],
  setTabsList: (): string[] => ["About", "Media", "Members"],
  tabsIdx: 0,
  setTabsIdx: (): number => 0,
  pageNo: 0,
  setPageNo: (): number => 0,
  socialRoutes: undefined,
  setSocialRoutes: (): SocialRoutes | undefined => undefined,
  introUploadUrl: "",
  setIntroUploadUrl: (): string => "",
  mobileUrl: "",
  setMobileUrl: (): string => "",
  bannerUrl: "",
  setBannerUrl: (): string => "",
  webUrl: "",
  setWebUrl: (): string => "",
});

export const HiveSettingsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlChanged, setUrlChanged] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [bannerUploaded, setBannerUploaded] = useState<boolean>(false);
  const [bannerUrlChanged, setBannerUrlChanged] = useState<boolean>(false);
  const [tabsList, setTabsList] = useState(["About", "Media", "Members"]);
  const [tabsIdx, setTabsIdx] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [socialRoutes, setSocialRoutes] = useState(undefined);
  const [introUploadUrl, setIntroUploadUrl] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");

  return (
    <HiveSettingsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        tabsList,
        setTabsList,
        tabsIdx,
        setTabsIdx,
        socialRoutes,
        setSocialRoutes,
        introUploadUrl,
        setIntroUploadUrl,
        mobileUrl,
        setMobileUrl,
        bannerUrl,
        setBannerUrl,
        webUrl,
        setWebUrl,
        urlChanged,
        setUrlChanged,
        bannerUrlChanged,
        setBannerUrlChanged,
        imageUploaded,
        setImageUploaded,
        bannerUploaded,
        setBannerUploaded,
        pageNo,
        setPageNo,
      }}
    >
      {children}
    </HiveSettingsContext.Provider>
  );
};

export const useHiveSettingsContext = () => useContext(HiveSettingsContext);
