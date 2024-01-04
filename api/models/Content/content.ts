export interface ChannelContentsDataRequest {
  channelID: string;
  organizationID: string | null;
  page: string;
  videoIdentifier?: number | null;
}

export interface SearchDataRequest {
  searchWords: string;
  channelId: string;
  pageNumber: number;
}

export interface Attribute2 {
  title: string;
  description: string;
}

export interface ChannelContentsDataResponse {
  active: boolean;
  actualFileName: string;
  id: string;
  S3_Path: string;
  videoId?: any;
  organisationID?: any;
  channelID?: any;
  thumbnail: string;
  previewImage: string;
  userId: string;
  name: string;
  channelType: string;
  attribute1: string[];
  attribute2: Attribute2[];
  attribute3: any[];
  attribute4?: any;
  attribute5?: any;
  receipeName?: any;
  itemDescription?: any;
  tags: string[];
  createdDate: string;
  lastUpdateDate: string;
  userName?: any;
  status: string;
  thumbNailBase64?: any;
  horizontalFlag?: any;
  horizontalPreviewImage?: any;
  profilePic?: any;
  profilePhoto: string;
  sourceURL: string;
  communityId?: any;
  pageNumber?: any;
  contentLimit?: any;
  channelUUID?: any;
  uploaduser: string;
  uploadby: string;
  approvalNotes?: any;
  approvedBy?: any;
  description: string;
  page: number;
  noOfRecords: number;
  totalPages: number;
  channelIdentifier: number;
  videoIdentifier: number;
  userIdentifier: number;
  isBookmarked: boolean;
  fileType?: any;
  videoUuid: string;
  horizontalVideoURL?: any;
  notificationId?: any;
  videoIds?: any;
  s3_Path: string;
  sourceip?: any;
  sourceIp?: any;
  createdBy: number;
}
