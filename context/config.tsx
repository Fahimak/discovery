"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface ContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  setIsLoading: (): boolean => false,
  isLoading: false,
});

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
