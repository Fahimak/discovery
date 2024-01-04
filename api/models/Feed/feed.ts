export interface FeedItem {
  createdDate: number;
  description: string;
  name: string;
  organisationId: string;
  previewImage: string;
  profilePhoto: string;
  sourceUrl: string;
  tags: string[];
  thumbnailUrl: string | null;
  totalRecords: number;
  userId: string;
  userName: string;
  videoId: string;
  videoUuid: string;
}

export interface FeedModel {
  data: FeedItem[];
}

export interface FeedRequestModel {
  communityUuid: string;
  pageNo: number;
  contentLimit: number;
}
