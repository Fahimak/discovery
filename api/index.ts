import axios, { AxiosError, AxiosInstance } from "axios";

import { BASE_AUTH, BASE_URL } from "./config";
import { v4 as uuidv4 } from "uuid";
import profileApi, { ProfileApi } from "./routes/Profile/profile";
import hivePageApi, { HivePageApi } from "./routes/Hive/hive";
import feedApi, { FeedApi } from "./routes/Feed/feed";
import channelsApi, { ChannelsApi } from "./routes/Channels/channel";
import videosApi, { VideosApi } from "./routes/Videos/videos";
import notificationApi, {
  NotificationApi,
} from "./routes/Notifications/notifications";
import eventsApi, { EventsApi } from "./routes/Hive/events";
import storyApi, { StoryApi } from "./routes/Story/story";
import chatApi, { ChatApi } from "./routes/Chat/chat";

class ClientApi {
  private instance: AxiosInstance;

  public profile: ProfileApi;
  public hive: HivePageApi;
  public feed: FeedApi;
  public channel: ChannelsApi;
  public videos: VideosApi;
  public notifications: NotificationApi;
  public events: EventsApi;
  public stories: StoryApi;
  public chat: ChatApi;

  constructor(url: string, private readonly _sessionId: string) {
    this.instance = axios.create({
      baseURL: `${url}`,
      // baseURL: `${url}`,
      timeout: 15000,
    });

    // Add an interceptor to all requests except for ones to /no-intercept endpoint
    this.instance.interceptors.request.use(
      (config) => {
        if (localStorage.getItem("@jwtToken") !== null) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "@jwtToken"
          )}`;
        }
        config.headers["Basic-Auth"] = BASE_AUTH;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a special interceptor for requests to /no-intercept endpoint
    const noInterceptInstance = axios.create({
      baseURL: `${url}`,
    });
    noInterceptInstance.interceptors.request.use(
      (config) => {
        config.headers["Basic-Auth"] = BASE_AUTH;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.profile = profileApi(this.instance);
    this.hive = hivePageApi(this.instance);
    this.feed = feedApi(this.instance);
    this.channel = channelsApi(this.instance);
    this.videos = videosApi(this.instance);
    this.notifications = notificationApi(this.instance);
    this.events = eventsApi(this.instance);
    this.stories = storyApi(this.instance);
    this.chat = chatApi(this.instance);

    // Use the noInterceptInstance for requests to /no-intercept endpoint
    this.instance.interceptors.request.use((config) => {
      if (config.url?.startsWith(`https://s3.` || `https://ipapi.co`)) {
        return noInterceptInstance(config);
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await this.updateToken();
        }
        throw error;
      }
    );
  }

  get sessionId() {
    return this._sessionId;
  }

  private async updateToken() {
    if (localStorage.getItem("@jwtToken") !== null) {
      await (async () => {
        try {
          const { data } = await this.profile.refreshToken();
          // this.setToken(data.data.authToken)
          if (data.responseInfo.httpCode === 200) {
            localStorage.setItem("@jwtToken", data.data.accessToken);
            window.location.reload();
          }
          if (data.responseInfo.httpCode === 300) {
            localStorage.setItem("isLoggedIn", "no");
            localStorage.removeItem("@jwtToken");
            //   this.hivePage.getHiveDetails({
            //     communitySubDomain: localStorage.getItem("subDomain")!,
            //   });
            //   this.hivePage.getHiveComponents({
            //     communityDomain: localStorage.getItem("subDomain"),
            //   });
          }
        } catch (error) {
          localStorage.setItem("isLoggedIn", "no");
          localStorage.removeItem("@jwtToken");
          // localStorage.setItem("isLoggedIn", "no");
          // this.hivePage.getHiveDetails({
          //   communitySubDomain: localStorage.getItem("subDomain")!,
          // });
          // this.hivePage.getHiveComponents({
          //   communityDomain: localStorage.getItem("subDomain"),
          // });
        }
      })();
      // const { data } = await this.profile.getProfile();
    }
  }
}

export default new ClientApi(BASE_URL as string, uuidv4());
