export interface EditChannelRequest {
  channelName: string;
  category: string;
  channelLogo: string;
  channelWebLogo: string;
  channelTier: string;
  uploadFlag: boolean;
  amount: number;
  description: string;
  maxVideoLength: number;
  channelId: number;
  channelNameFlag: boolean;
  categoryFlag: boolean;
  channelTierFlag: boolean;
  amountFlag: boolean;
  descriptionFlag: boolean;
  maxVideoLengthFlag: boolean;
  channelLogoFlag: boolean;
  channelWebLogoFlag: boolean;
  orderByDesc: boolean;
  adsRequired: boolean;
}

export interface EditVideoRequest {
  channelUUID: string;
  videoId: string;
  tags: string[];
  name: string;
  description: null;
  attribute1: null;
  attribute2: null;
  attribute3: string[];
  attribute4: null;
  attribute5: null;
  thumbnail: string | null;
  pitchDeckFile?: string;
  pitchDeckFileType?: string;
  productUrl?: string;
}
