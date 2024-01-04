"use client";
import api from "api";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useStoryContext } from "context/Story/stories";
import { useVideoUploadContext } from "context/Videos/videoUpload";

export const useStoriesApi = () => {
  const stories = useStoryContext();
  const hive = useHiveContext();
  const upload = useVideoUploadContext();
  const hiveSettings = useHiveSettingsContext();

  const getAllStories = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStories({
        organizationUuid: hive.hiveUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setGetStoriesResp(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const publishStory = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.publishStory({
        storyUuid: stories.storyUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStoryItem = async (passedUuid: string) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStoryItem({
        storyUuid: passedUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryItem(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const deleteStory = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.deleteStory({
        storyUuid: stories.storyUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStoryViews = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStoryViews({
        storyUuid: stories.viewingStoryUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryViews(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getSegmentViews = async (passedId: number) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getSegmentViews({
        storyUuid: stories.viewingStoryUuid,
        segmentId: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryViews(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStoryDetails = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStoryDetails({
        storyUuid: stories.viewingStoryUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoriesList(data.data.data);
        stories.reducedStoryList = [];
        stories.setReducedStoryList([]);
        const transformedStories = data.data.data.map((story) => ({
          selectedEmoji: "default",
          storyItemId: story.id,
          storyUuid: story.storyUuid,
          url:
            story.type === "text"
              ? "https://veehivedev-images.s3.amazonaws.com/background/portrait_photo.png"
              : story.storyUrl,
          title: story.title,
          description: story.description,
          type: story.type === "text" ? "image" : story.type,
          actionLink: story.actionLink,
          colorCode: story.colorCode,
          longDescriptionList: story.longDescriptionList,
          textColorCode: story.textColorCode,
        }));

        stories.setReducedStoryList(transformedStories);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStoryReactions = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStoryReactions({
        storyUuid: stories.viewingStoryUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryReactions(data.data.data);
        stories.setReducedReactions({
          total: 0,
          sad: 0,
          happy: 0,
          neutral: 0,
        });
        data.data.data.map((reaction) => {
          stories.setReducedReactions((prevReactions) => {
            let updatedReactions = { ...prevReactions };

            updatedReactions.total += reaction.reactionCount;

            if (reaction.reactionId === 3) {
              updatedReactions.happy += reaction.reactionCount;
            } else if (reaction.reactionId === 2) {
              updatedReactions.neutral += reaction.reactionCount;
            } else if (reaction.reactionId === 1) {
              updatedReactions.sad += reaction.reactionCount;
            }

            return updatedReactions;
          });
        });
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getSegmentReactions = async (passedId: number) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getSegmentReactions({
        storyUuid: stories.viewingStoryUuid,
        segmentId: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryReactions(data.data.data);
        stories.setReducedReactions({
          total: 0,
          sad: 0,
          happy: 0,
          neutral: 0,
        });
        data.data.data.map((reaction) => {
          stories.setReducedReactions((prevReactions) => {
            let updatedReactions = { ...prevReactions };

            updatedReactions.total += reaction.reactionCount;

            if (reaction.reactionId === 3) {
              updatedReactions.happy += reaction.reactionCount;
            } else if (reaction.reactionId === 2) {
              updatedReactions.neutral += reaction.reactionCount;
            } else if (reaction.reactionId === 1) {
              updatedReactions.sad += reaction.reactionCount;
            }

            return updatedReactions;
          });
        });
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStoryLocation = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStoryLocation({
        storyUuid: stories.viewingStoryUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryLocation(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const updateStoryReaction = async (
    passedId: number,
    passedReactionId: number,
    passedReactType: string
  ) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.updateStoryReaction({
        storyUuid: stories.viewingStoryUuid,
        sessionId: api.sessionId,
        storySegmentId: passedId,
        reactionId: passedReactionId,
        reactionType: passedReactType,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryLocation(data.data.data);
      } else {
      }

      getStorySegmentReact(passedId);
    } catch {}
    stories.setIsFetching(false);
  };

  const getSegmentLocation = async (passedId: number) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getSegmentLocation({
        storyUuid: stories.storyUuid,
        segmentId: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStoryLocation(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const createStory = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.createStory({
        title: stories.storyTitle,
        description: stories.storyDesc,
        organizationId: hive.hiveDetails?.communityId || 0,
        organizationUuid: hive.hiveUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStorySegments([]);
        stories.setCreateStoryResp(data.data.data);
        stories.setStoryUuid(data.data.data.storyUuid);
        stories.storyUuid = data.data.data.storyUuid;
        addStorySegments(0);
        stories.setStoryCreated(true);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStorySegmentReact = async (passedSegmentId: number) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getSegmentItemReact({
        storyUuid: stories.storyUuid,
        storySegmentId: passedSegmentId,
        sessionId: api.sessionId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setSegmentItemReact(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const getStorySocialCount = async () => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.getStorySocialCount({
        storyUuid: stories.storyUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setStorySocialCount(data.data.data);
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const uploadStoryToS3 = async (body: { url: string; formData: FormData }) => {
    stories.setIsFetching(true);
    try {
      const { data } = await api.videos.uploadToS3(body.formData, body.url);

      getStorySegments();

      return data.data;
    } catch (error) {
      getStorySegments();
    }
    stories.setIsFetching(false);
  };

  const getStorySegments = async () => {
    stories.setIsFetching(true);
    try {
      if (!!stories.storyUuid) {
        const { data } = await api.stories.getSegments({
          storyUuid: stories.storyUuid,
        });

        if (data.responseInfo.httpCode === 200) {
          stories.setStorySegments(data.data);
          data.data[0] &&
            data.data[0].id &&
            stories.setCurrentStoryId(data.data[0].id);
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
    stories.setIsFetching(false);
  };

  const editStory = async () => {
    stories.setIsFetching(true);
    try {
      const { data } = await api.stories.editStory({
        storyUuid: stories.storyUuid,
        thumbnail: hiveSettings.webUrl,
        organizationUuid: hive.hiveUuid,
      });

      if (data.responseInfo.httpCode === 200) {
        stories.setEditStoryResp(data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    stories.setIsFetching(false);
  };

  const addStorySegments = async (passedOrder: number) => {
    stories.setIsFetching(true);
    try {
      const { data } = await api.stories.addSegments({
        description: "",
        isActive: false,
        storyUrl: "",
        storyUuid: stories.storyUuid,
        title: "",
        isImage: false,
        isVideo: false,
        colorCode: "#B4CEBE",
        communityUuid: hive.hiveUuid,
        contentType: "",
        order: passedOrder,
      });

      if (data.responseInfo.httpCode === 200) {
        getStorySegments();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    stories.setIsFetching(false);
  };

  const removeStorySegments = async (passedId: number) => {
    stories.setIsFetching(true);
    try {
      const { data } = await api.stories.removeSegment({
        id: passedId,
        storyUuid: stories.storyUuid,
      });

      if (data.responseInfo.httpCode === 200) {
        console.group("running get");
        getStorySegments();
      } else {
      }
    } catch (error) {}
    stories.setIsFetching(false);
  };

  const updateStoryOrder = async (passedId: number, order: number) => {
    stories.setIsFetching(true);
    try {
      const { data } = await api.stories.updateStoryOrder({
        storyUuid: stories.storyUuid,
        order: order,
        storySegmentId: passedId,
      });

      if (data.responseInfo.httpCode === 200) {
        getStorySegments();
      } else {
      }
    } catch (error) {}
    stories.setIsFetching(false);
  };

  const editStorySegments = async (
    passedDesc: string,
    passedUuid: string,
    passedTitle: string,
    isImage: boolean,
    isVideo: boolean,
    passedColorCode: string,
    isMediaChanged: boolean,
    passedId: number,
    passedLink: string,
    passedOrder: number,
    thumbnail?: string
  ) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.editSegment({
        description: passedDesc,
        isActive: false,
        storyUrl: "",
        storyUuid: stories.storyUuid,
        title: passedTitle,
        isImage: isImage,
        isVideo: isVideo,
        colorCode: passedColorCode,
        communityUuid: hive.hiveUuid,
        contentType: upload.contentType,
        isMediaChanged: isMediaChanged,
        storyId: passedId,
        thumbnail: thumbnail || "",
        actionLink: passedLink,
        order: passedOrder,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setEditSegmentsResp(data.data.data);
        const formData = new FormData();

        formData.append(
          "x-amz-meta-userid",
          data.data.data.objPreSignedResponse.body.data.fields[
            "x-amz-meta-userid"
          ]!
        );
        formData.append(
          "Content-Type",
          data.data.data.objPreSignedResponse.body.data.fields["Content-Type"]
        );
        formData.append(
          "key",
          data.data.data.objPreSignedResponse.body.data.fields.key!
        );
        formData.append(
          "bucket",
          data.data.data.objPreSignedResponse.body.data.fields.bucket!
        );
        formData.append(
          "X-Amz-Algorithm",
          data.data.data.objPreSignedResponse.body.data.fields[
            "X-Amz-Algorithm"
          ]!
        );
        formData.append(
          "X-Amz-Credential",
          data.data.data.objPreSignedResponse.body.data.fields[
            "X-Amz-Credential"
          ]!
        );
        formData.append(
          "X-Amz-Date",
          data.data.data.objPreSignedResponse.body.data.fields["X-Amz-Date"]!
        );
        formData.append(
          "X-Amz-Security-Token",
          data.data.data.objPreSignedResponse.body.data.fields[
            "X-Amz-Security-Token"
          ]!
        );
        formData.append(
          "X-Amz-Signature",
          data.data.data.objPreSignedResponse.body.data.fields[
            "X-Amz-Signature"
          ]!
        );
        formData.append(
          "Policy",
          data.data.data.objPreSignedResponse.body.data.fields.Policy!
        );
        formData.append("file", upload.videoFile || stories.uploadedFile!);

        upload.setVideoFile(null);
        upload.setThumbnail("");
        stories.setUploadedFile(null);

        uploadStoryToS3({
          url: data.data.data.objPreSignedResponse.body.data.url,
          formData: formData,
        });
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  const editStorySegmentsBg = async (
    passedDesc: string,
    passedUuid: string,
    passedTitle: string,
    isImage: boolean,
    isVideo: boolean,
    passedColorCode: string,
    isMediaChanged: boolean,
    passedId: number,
    passedLink: string,
    passedOrder: number,
    thumbnail?: string
  ) => {
    stories.setIsFetching(true);
    try {
      const data = await api.stories.editSegment({
        description: passedDesc,
        isActive: false,
        storyUrl: "",
        storyUuid: stories.storyUuid,
        title: passedTitle,
        isImage: isImage,
        isVideo: isVideo,
        colorCode: passedColorCode,
        communityUuid: hive.hiveUuid,
        contentType: "",
        isMediaChanged: isMediaChanged,
        storyId: passedId,
        thumbnail: thumbnail || "",
        actionLink: passedLink,
        order: passedOrder,
      });

      if (data.data.responseInfo.httpCode === 200) {
        stories.setEditSegmentsResp(data.data.data);

        getStorySegments();
      } else {
      }
    } catch {}
    stories.setIsFetching(false);
  };

  return {
    getAllStories,
    getStoryViews,
    getStoryLocation,
    getStoryReactions,
    getStorySocialCount,
    getStoryItem,
    deleteStory,
    getStoryDetails,
    getSegmentLocation,
    getSegmentReactions,
    getSegmentViews,
    getStorySegmentReact,
    updateStoryReaction,
    createStory,
    editStorySegments,
    getStorySegments,
    editStorySegmentsBg,
    addStorySegments,
    removeStorySegments,
    updateStoryOrder,
    publishStory,
    editStory,
  };
};

export default useStoriesApi;
