"use client";
import { ChildComponent, Components } from "api/models/Hive/hiveComponents";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface ChildComponentsContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  childComponents: ChildComponent[];
  setChildComponents: Dispatch<SetStateAction<ChildComponent[]>>;
  channelComponents: ChildComponent[];
  setChannelComponents: Dispatch<SetStateAction<ChildComponent[]>>;
  homeComponents: ChildComponent[];
  setHomeComponents: Dispatch<SetStateAction<ChildComponent[]>>;
  storyComponents: ChildComponent[];
  setStoryComponents: Dispatch<SetStateAction<ChildComponent[]>>;

  videoTabs: Components[];
  setVideoTabs: Dispatch<SetStateAction<Components[]>>;
}

const ChildComponentsContext = createContext<ChildComponentsContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  childComponents: [],
  setChildComponents: (): ChildComponent[] => [],
  channelComponents: [],
  setChannelComponents: (): ChildComponent[] => [],
  homeComponents: [],
  setHomeComponents: (): ChildComponent[] => [],
  storyComponents: [],
  setStoryComponents: (): ChildComponent[] => [],
  videoTabs: [],
  setVideoTabs: (): Components[] => [],
});

export const ChildComponentsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [childComponents, setChildComponents] = useState<ChildComponent[]>([]);
  const [channelComponents, setChannelComponents] = useState<ChildComponent[]>(
    []
  );
  const [homeComponents, setHomeComponents] = useState<ChildComponent[]>([]);
  const [storyComponents, setStoryComponents] = useState<ChildComponent[]>([]);
  const [videoTabs, setVideoTabs] = useState<Components[]>([]);

  return (
    <ChildComponentsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        childComponents,
        setChildComponents,
        channelComponents,
        setChannelComponents,
        homeComponents,
        setHomeComponents,
        storyComponents,
        setStoryComponents,
        videoTabs,
        setVideoTabs,
      }}
    >
      {children}
    </ChildComponentsContext.Provider>
  );
};

export const useChildComponentsContext = () =>
  useContext(ChildComponentsContext);
