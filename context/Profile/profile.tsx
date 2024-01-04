"use client";

import { ProfileItem } from "api/models/Profile/profile";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface ProfileContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  profileDetails: ProfileItem | undefined;
  setProfileDetails: Dispatch<SetStateAction<ProfileItem | undefined>>;
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  isMemberView: boolean;
  setIsMemberView: Dispatch<SetStateAction<boolean>>;
}

const ProfileContext = createContext<ProfileContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  isMemberView: false,
  setIsMemberView: (): boolean => false,
  profileDetails: undefined,
  setProfileDetails: (): ProfileItem | undefined => undefined,
  userId: 0,
  setUserId: (): number => 0,
  userName: "",
  setUserName: (): string => "",
});

export const ProfileContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMemberView, setIsMemberView] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  const [profileDetails, setProfileDetails] = useState<ProfileItem | undefined>(
    undefined
  );

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        setIsLoading,
        profileDetails,
        setProfileDetails,
        userId,
        setUserId,
        userName,
        setUserName,
        isMemberView,
        setIsMemberView,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
