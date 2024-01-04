export interface EventsRequestModel {
  eventName: string;
  eventDescription: string;
  eventVideo: string;
  eventThumbnail: string;
  eventBanner: string;
  eventStartDate: Date | null;
  eventEndDate: Date | null;
  eventDurationInMinutes: number;
  eventMedium: string;
  eventLocation: string;
  eventAddress: string;
  eventColor: string;
  organizationUuid: string;
}

export interface EventsEditRequestModel {
  eventName?: string;
  eventDescription?: string;
  eventVideo?: string;
  eventThumbnail?: string | null;
  eventBanner?: string | null;
  eventStartDate?: Date | null;
  eventEndDate?: Date | null;
  eventDurationInMinutes?: number;
  eventMedium?: string;
  eventLocation?: string;
  eventAddress?: string;
  eventColor?: string;
  organizationUuid: string;
  eventUuid: string;
}

export interface EventsContentUploadModel {
  eventUuid: string;
  contentType: string;
  organizationUuid: string;
}

export interface EventsModel {
  event: EventsItem;
  hasAccess: number;
  hostDetails: {
    userName: string;
    email: string;
    phone: string;
    phoneExt: number;
    profilePhoto: null | string;
  };
  organizationDetail: {
    organizationName: string;
    organizationDesc: string;
  };
}

export interface EventsItem {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  ipAddress: null | string;
  id: number;
  eventUuid: string;
  eventIdentifier: string;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  eventName: string;
  eventDescription: string;
  eventVideo: string;
  eventThumbnail: string;
  eventBanner: string;
  eventStartDate: any;
  eventEndDate: any;
  eventDurationInMinutes: null | number;
  eventMedium: string;
  eventLocation: string;
  eventAddress: string;
  eventColor: string;
  eventLink: null | string;
}

export interface EventUserItem {
  userName: string;
  email: string;
  phone: string;
  phoneExt: number;
  profilePhoto: string;
}

export interface EventPresignedResponse {
  headers: {
    "Content-Type": string[];
    "Transfer-Encoding": string[];
    Date: string[];
    "Keep-Alive": string[];
    Connection: string[];
  };
  body: {
    data: {
      url: string;
      fields: {
        "Content-Type": string;
        "x-amz-meta-userid": string;
        key: string;
        bucket: string;
        "X-Amz-Algorithm": string;
        "X-Amz-Credential": string;
        "X-Amz-Date": string;
        "X-Amz-Security-Token": string;
        Policy: string;
        "X-Amz-Signature": string;
      };
    };
  };
  statusCodeValue: number;
  statusCode: string;
}

export interface EventsListModel {
  title: string;
  start: number;
  end: number;
}
