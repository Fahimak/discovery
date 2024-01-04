"use client";
import { Components } from "api/models/Hive/hiveComponents";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface HiveComponentsContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  allMenuItems: Components[];
  setAllMenuItems: Dispatch<SetStateAction<Components[]>>;
  userMenuItems: Components[];
  setUserMenuItems: Dispatch<SetStateAction<Components[]>>;
  adminMenuItems: Components[];
  setAdminMenuItems: Dispatch<SetStateAction<Components[]>>;
  navbarItems: Components[];
  setNavbarItems: Dispatch<SetStateAction<Components[]>>;
  hiveConfigItems: Components[];
  setHiveConfigItems: Dispatch<SetStateAction<Components[]>>;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
}

const HiveComponentsContext = createContext<HiveComponentsContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  allMenuItems: [],
  setAllMenuItems: (): Components[] => [],
  adminMenuItems: [],
  setAdminMenuItems: (): Components[] => [],
  userMenuItems: [],
  setUserMenuItems: (): Components[] => [],
  navbarItems: [],
  setNavbarItems: (): Components[] => [],
  hiveConfigItems: [],
  setHiveConfigItems: (): Components[] => [],
  selectedMenu: "",
  setSelectedMenu: (): string => "",
});

export const HiveComponentsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [allMenuItems, setAllMenuItems] = useState<Components[]>([]);
  const [adminMenuItems, setAdminMenuItems] = useState<Components[]>([]);
  const [userMenuItems, setUserMenuItems] = useState<Components[]>([]);
  const [navbarItems, setNavbarItems] = useState<Components[]>([]);
  const [hiveConfigItems, setHiveConfigItems] = useState<Components[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <HiveComponentsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        allMenuItems,
        setAllMenuItems,
        userMenuItems,
        setUserMenuItems,
        adminMenuItems,
        setAdminMenuItems,
        hiveConfigItems,
        setHiveConfigItems,
        navbarItems,
        setNavbarItems,
        selectedMenu,
        setSelectedMenu,
      }}
    >
      {children}
    </HiveComponentsContext.Provider>
  );
};

export const useHiveComponentsContext = () => useContext(HiveComponentsContext);
