"use client";
import {
  HiveActivitiesItem,
  OnlineMembersModel,
} from "api/models/Hive/hiveActivities";
import { ContactInfoModel, SocialLinksItem } from "api/models/Hive/hiveDetails";
import { type } from "os";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface HiveConfigContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  alertOpen: Alert | undefined;
  setAlertOpen: any;
  activitiesPageNo: number;
  setActivitiesPageNo: Dispatch<SetStateAction<number>>;
  socialLinks: SocialLinksItem[];
  setSocialLinks: Dispatch<SetStateAction<SocialLinksItem[]>>;
  contactInfo: ContactInfoModel | undefined;
  setContactInfo: Dispatch<SetStateAction<ContactInfoModel | undefined>>;
  onlineMembers: OnlineMembersModel[];
  setOnlineMembers: Dispatch<SetStateAction<OnlineMembersModel[]>>;
  activities: HiveActivitiesItem | undefined;
  setActivities: Dispatch<SetStateAction<HiveActivitiesItem | undefined>>;
  ToastSuccess: any;
  ToastError: any;
  ToastInfo: any;
  csvSuccessMessage: string;
  setCsvSuccessMessage: any;
  csvErrorMessage: string;
  setCsvErrorMessage: any;
  importCount: number;
  setImportCount: any;
}

interface Alert {
  type: string;
  message: string;
}

const HiveConfigContext = createContext<HiveConfigContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  alertOpen: { type: "none", message: "none" },
  setAlertOpen: (): void => {},
  activitiesPageNo: 0,
  setActivitiesPageNo: (): number => 0,
  socialLinks: [],
  setSocialLinks: (): SocialLinksItem[] => [],
  contactInfo: undefined,
  setContactInfo: (): ContactInfoModel | undefined => undefined,
  onlineMembers: [],
  setOnlineMembers: (): OnlineMembersModel[] => [],
  activities: undefined,
  setActivities: (): HiveActivitiesItem | undefined => undefined,
  ToastError: undefined,
  ToastInfo: undefined,
  ToastSuccess: undefined,
  csvErrorMessage: "",
  setCsvErrorMessage: (): string => "",
  csvSuccessMessage: "",
  setCsvSuccessMessage: (): string => "",
  importCount: 0,
  setImportCount: (): number => 0,
});

export const HiveConfigContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Alert>({
    type: "none",
    message: "none",
  });
  const [activitiesPageNo, setActivitiesPageNo] = useState<number>(0);
  const [importCount, setImportCount] = useState<number>(0);
  const [csvSuccessMessage, setCsvSuccessMessage] = useState<string>("");
  const [csvErrorMessage, setCsvErrorMessage] = useState<string>("");

  const [socialLinks, setSocialLinks] = useState<SocialLinksItem[]>([]);
  const [onlineMembers, setOnlineMembers] = useState<OnlineMembersModel[]>([]);
  const [activities, setActivities] = useState<HiveActivitiesItem | undefined>(
    undefined
  );
  const [contactInfo, setContactInfo] = useState<ContactInfoModel | undefined>(
    undefined
  );

  const ToastSuccess = (message: string) => {
    setAlertOpen({
      type: "success",
      message: message,
    });
  };

  const ToastError = (message: string) => {
    setAlertOpen({
      type: "error",
      message: message,
    });
  };

  const ToastInfo = (message: string) => {
    setAlertOpen({
      type: "info",
      message: message,
    });
  };

  return (
    <HiveConfigContext.Provider
      value={{
        isLoading,
        setIsLoading,
        activitiesPageNo,
        setActivitiesPageNo,
        socialLinks,
        setSocialLinks,
        contactInfo,
        setContactInfo,
        onlineMembers,
        setOnlineMembers,
        activities,
        setActivities,
        alertOpen,
        setAlertOpen,
        ToastError,
        ToastSuccess,
        ToastInfo,
        importCount,
        setImportCount,
        csvErrorMessage,
        setCsvErrorMessage,
        csvSuccessMessage,
        setCsvSuccessMessage,
      }}
    >
      {children}
    </HiveConfigContext.Provider>
  );
};

export const useHiveConfigContext = () => useContext(HiveConfigContext);
