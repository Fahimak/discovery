"use client";
import {
  CreateStoryModel,
  SegmentItem,
  StoryItemModel,
  StoryLocationModel,
  OrganizationStory,
  OrganizationStoryObject,
  OrganizationStoryItem,
  SegmentItemReactModel,
  StorySocialCountItem,
  ReactionModel,
  StoryViewModel,
  ReducedReactions,
} from "api/models/Story/story";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";

// Assuming you've imported the necessary types: CreateStoryModel, SegmentItem, etc.

interface StoryContextProps {
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;

  createStoryResp: CreateStoryModel | undefined;
  setCreateStoryResp: Dispatch<SetStateAction<CreateStoryModel | undefined>>;

  storyTitle: string;
  setStoryTitle: Dispatch<SetStateAction<string>>;

  storyDesc: string;
  setStoryDesc: Dispatch<SetStateAction<string>>;

  actionLink: string;
  setActionLink: Dispatch<SetStateAction<string>>;

  storyCreated: boolean;
  setStoryCreated: Dispatch<SetStateAction<boolean>>;

  storyUuid: string;
  setStoryUuid: Dispatch<SetStateAction<string>>;

  storySegments: SegmentItem[];
  setStorySegments: Dispatch<SetStateAction<SegmentItem[]>>;

  imageUploaded: boolean;
  setImageUploaded: Dispatch<SetStateAction<boolean>>;

  compressedImgUrl: string;
  setCompressedImgUrl: Dispatch<SetStateAction<string>>;

  addSegmentsResp: any;
  setAddSegmentsResp: Dispatch<SetStateAction<any>>;

  currentStoryId: number;
  setCurrentStoryId: Dispatch<SetStateAction<number>>;

  currentStoryIndex: number;
  setCurrentStoryIndex: Dispatch<SetStateAction<number>>;

  editSegmentsResp: any;
  setEditSegmentsResp: Dispatch<SetStateAction<any>>;

  uploadedFile: File | Blob | null;
  setUploadedFile: Dispatch<SetStateAction<File | Blob | null>>;

  color: string;
  setColor: Dispatch<SetStateAction<string>>;

  getStoriesResp: StoryItemModel[];
  setGetStoriesResp: Dispatch<SetStateAction<StoryItemModel[]>>;

  storyLocation: StoryLocationModel[];
  setStoryLocation: Dispatch<SetStateAction<StoryLocationModel[]>>;

  storiesList: OrganizationStory[];
  setStoriesList: Dispatch<SetStateAction<OrganizationStory[]>>;

  reducedStoryList: OrganizationStoryObject[];
  setReducedStoryList: Dispatch<SetStateAction<OrganizationStoryObject[]>>;

  storyItem: OrganizationStoryItem | null;
  setStoryItem: Dispatch<SetStateAction<OrganizationStoryItem | null>>;

  startClicked: boolean;
  setStartClicked: Dispatch<SetStateAction<boolean>>;

  currentStoryItem: OrganizationStoryItem | null;
  setCurrentStoryItem: Dispatch<SetStateAction<OrganizationStoryItem | null>>;

  viewingStoryUuid: string;
  setViewingStoryUuid: Dispatch<SetStateAction<string>>;

  segmentItemReact: SegmentItemReactModel | undefined;
  setSegmentItemReact: Dispatch<
    SetStateAction<SegmentItemReactModel | undefined>
  >;

  editStoryResp: boolean;
  setEditStoryResp: Dispatch<SetStateAction<boolean>>;

  storySocialCount: StorySocialCountItem[];
  setStorySocialCount: Dispatch<SetStateAction<StorySocialCountItem[]>>;

  unknownCount: number;
  setUnknownCount: Dispatch<SetStateAction<number>>;

  storyViews: StoryViewModel | undefined;
  setStoryViews: Dispatch<SetStateAction<StoryViewModel | undefined>>;

  storyReactions: ReactionModel[];
  setStoryReactions: Dispatch<SetStateAction<ReactionModel[]>>;

  reducedReactions: ReducedReactions;
  setReducedReactions: Dispatch<SetStateAction<ReducedReactions>>;
}

const defaultStoryState: StoryContextProps = {
  isFetching: false,
  setIsFetching: () => {},

  createStoryResp: undefined,
  setCreateStoryResp: () => {},

  storyTitle: "",
  setStoryTitle: () => {},

  storyDesc: "",
  setStoryDesc: () => {},

  actionLink: "",
  setActionLink: () => {},

  storyCreated: false,
  setStoryCreated: () => {},

  storyUuid: "",
  setStoryUuid: () => {},

  storySegments: [],
  setStorySegments: () => {},

  imageUploaded: false,
  setImageUploaded: () => {},

  compressedImgUrl: "",
  setCompressedImgUrl: () => {},

  addSegmentsResp: null,
  setAddSegmentsResp: () => {},

  currentStoryId: 0,
  setCurrentStoryId: () => {},

  currentStoryIndex: 0,
  setCurrentStoryIndex: () => {},

  editSegmentsResp: null,
  setEditSegmentsResp: () => {},

  uploadedFile: null,
  setUploadedFile: () => {},

  color: "",
  setColor: () => {},

  getStoriesResp: [],
  setGetStoriesResp: () => {},

  storyLocation: [],
  setStoryLocation: () => {},

  storiesList: [],
  setStoriesList: () => {},

  reducedStoryList: [],
  setReducedStoryList: () => {},

  storyItem: null,
  setStoryItem: () => {},

  startClicked: false,
  setStartClicked: () => {},

  currentStoryItem: null,
  setCurrentStoryItem: () => {},

  viewingStoryUuid: "",
  setViewingStoryUuid: () => {},

  segmentItemReact: undefined,
  setSegmentItemReact: () => {},

  editStoryResp: false,
  setEditStoryResp: () => {},

  storySocialCount: [],
  setStorySocialCount: () => {},

  unknownCount: 0,
  setUnknownCount: () => {},

  storyViews: undefined,
  setStoryViews: () => {},

  storyReactions: [],
  setStoryReactions: () => {},

  reducedReactions: {} as ReducedReactions, // Assuming ReducedReactions is an object type.
  setReducedReactions: () => {},
};

const StoryContext = createContext<StoryContextProps>(defaultStoryState);

export const StoryContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [createStoryResp, setCreateStoryResp] = useState<
    CreateStoryModel | undefined
  >(undefined);
  const [storyTitle, setStoryTitle] = useState<string>("");
  const [storyDesc, setStoryDesc] = useState<string>("");
  const [actionLink, setActionLink] = useState<string>("");
  const [storyCreated, setStoryCreated] = useState<boolean>(false);
  const [storyUuid, setStoryUuid] = useState<string>("");
  const [storySegments, setStorySegments] = useState<SegmentItem[]>([]);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [compressedImgUrl, setCompressedImgUrl] = useState<string>("");
  const [addSegmentsResp, setAddSegmentsResp] = useState<any>(null);
  const [currentStoryId, setCurrentStoryId] = useState<number>(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [editSegmentsResp, setEditSegmentsResp] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | Blob | null>(null);
  const [color, setColor] = useState<string>("");
  const [getStoriesResp, setGetStoriesResp] = useState<StoryItemModel[]>([]);
  const [storyLocation, setStoryLocation] = useState<StoryLocationModel[]>([]);
  const [storiesList, setStoriesList] = useState<OrganizationStory[]>([]);
  const [reducedStoryList, setReducedStoryList] = useState<
    OrganizationStoryObject[]
  >([]);
  const [storyItem, setStoryItem] = useState<OrganizationStoryItem | null>(
    null
  );
  const [startClicked, setStartClicked] = useState<boolean>(false);
  const [currentStoryItem, setCurrentStoryItem] =
    useState<OrganizationStoryItem | null>(null);
  const [viewingStoryUuid, setViewingStoryUuid] = useState<string>("");
  const [segmentItemReact, setSegmentItemReact] = useState<
    SegmentItemReactModel | undefined
  >(undefined);
  const [editStoryResp, setEditStoryResp] = useState<boolean>(false);
  const [storySocialCount, setStorySocialCount] = useState<
    StorySocialCountItem[]
  >([]);
  const [unknownCount, setUnknownCount] = useState<number>(0);

  const [storyViews, setStoryViews] = useState<StoryViewModel | undefined>(
    undefined
  );
  const [storyReactions, setStoryReactions] = useState<ReactionModel[]>([]);
  const [reducedReactions, setReducedReactions] = useState<ReducedReactions>(
    {} as ReducedReactions
  ); // Assuming ReducedReactions is an object type.

  return (
    <StoryContext.Provider
      value={{
        isFetching,
        setIsFetching,
        createStoryResp,
        setCreateStoryResp,
        storyTitle,
        setStoryTitle,
        storyDesc,
        setStoryDesc,
        actionLink,
        setActionLink,
        storyCreated,
        setStoryCreated,
        storyUuid,
        setStoryUuid,
        storySegments,
        setStorySegments,
        imageUploaded,
        setImageUploaded,
        compressedImgUrl,
        setCompressedImgUrl,
        addSegmentsResp,
        setAddSegmentsResp,
        currentStoryId,
        setCurrentStoryId,
        currentStoryIndex,
        setCurrentStoryIndex,
        editSegmentsResp,
        setEditSegmentsResp,
        uploadedFile,
        setUploadedFile,
        color,
        setColor,
        getStoriesResp,
        setGetStoriesResp,
        storyLocation,
        setStoryLocation,
        storiesList,
        setStoriesList,
        reducedStoryList,
        setReducedStoryList,
        storyItem,
        setStoryItem,
        startClicked,
        setStartClicked,
        currentStoryItem,
        setCurrentStoryItem,
        viewingStoryUuid,
        setViewingStoryUuid,
        segmentItemReact,
        setSegmentItemReact,
        editStoryResp,
        setEditStoryResp,
        storySocialCount,
        setStorySocialCount,
        unknownCount,
        setUnknownCount,
        storyViews,
        setStoryViews,
        storyReactions,
        setStoryReactions,
        reducedReactions,
        setReducedReactions,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
