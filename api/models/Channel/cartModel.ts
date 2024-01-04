interface ChannelList {
  channelName: string;
  channelUuid: string;
  channelId: number;
  noOfVideos: number;
  channelStatus: string;
  noOfSubscribers: number;
  channelTier: string;
  totalRevenue: number;
  channelLogo: string;
  channelDesc: string;
  duration: number;
  amount: number;
  hasAccess: boolean;
  isModerator: boolean;
  isDefault: boolean;
  webLogo: string;
}

export interface CartModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  isActive: boolean;
  cartItemType: string;
  cartItemAmount: number;
  currency: string;
  cartItemName: string;
  cartItemReferenceId: string;
  paymentStatus: boolean;
  userId: number;
  quantity: number;
  channelDataList: ChannelList[] | [];
}

export interface RazorPayModel {
  orderId: string;
  orderAmount: number;
  currency: string;
  status: string;
}

export interface CartIdListForCheckoutModel {
  cartId: number;
  referenceId: string;
}

export interface RazorPayOrder {
  orderId: string;
  orderAmount: number;
  currency: string;
  status: string;
  paymentId: string | null;
  signature: string | null;
}
