"use client";
import { Dialog } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import BackButton from "components/BackButton";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import PageLayout from "components/PageLayout/PageLayout";
import { useCreateChannelContext } from "context/Channel/createChannel";
import useCreateChannelApi from "hooks/apiHooks/CreateChannel/useCreateChannelApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChannelSettings from "./ChannelSettings";

const CreateChannel = () => {
  const navigate = useRouter();

  const createChannel = useCreateChannelContext();

  useEffect(() => {
    createChannel.setVideoDuration(0);
    createChannel.setIsPaid(false);
    createChannel.setIsPrivate(false);
    createChannel.setIsAds(false);
    createChannel.setAmount("");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFetching = createChannel.isLoading;

  const [createChannelForm, setCreateChannelForm] = useState({
    channelName: "",
    channelDescription: "",
  });

  const { createChannelApi } = useCreateChannelApi();

  const handleCreateChannel = () => {
    createChannelApi(
      createChannelForm.channelName,
      createChannelForm.channelDescription
    );
  };

  const handleChannelForm = (e: React.ChangeEvent<any>, limit: number) => {
    setCreateChannelForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value.slice(0, limit),
    }));
  };

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="create_channel_container">
          <BackButton />
          <h1>Create new channel</h1>
          <div>
            <div className="title_and_limit">
              <h4>Channel Name*</h4>
              <div className="character_limit text-sm">
                {createChannelForm.channelName.length}/18
              </div>
            </div>
            <LineBreak />
            <input
              name="channelName"
              value={createChannelForm.channelName}
              onChange={(e) => handleChannelForm(e, 18)}
              className="input_border text_padding input_width_full"
              placeholder="Eg: Introduction"
            />
          </div>
          <div>
            <div className="title_and_limit">
              <h4>Channel Description</h4>
              <div className="character_limit text-sm">
                {createChannelForm.channelDescription.length}/280
              </div>{" "}
            </div>
            <LineBreak />
            <textarea
              name="channelDescription"
              value={createChannelForm.channelDescription}
              onChange={(e) => handleChannelForm(e, 280)}
              className="input_border text_padding input_width_full who_are_we_section_text"
              placeholder="A few words about the channel"
            />
          </div>
          <div>
            <h4>Channel Image</h4>
            <LineBreak />
            <ImageDropzone file="channel" />
          </div>
          <div>
            <h4>Channel Settings</h4>
            <LineBreak />
            <ChannelSettings />
          </div>
          <div className="flex-end">
            <div className="create_channel_btns">
              <div onClick={() => navigate.push("..")} className="secondaryBtn">
                Cancel
              </div>
              {createChannelForm.channelName ? (
                <div onClick={handleCreateChannel} className="primaryBtn">
                  Create
                </div>
              ) : (
                <div className="disabledBtn">Create</div>
              )}
            </div>
          </div>
        </div>
      </IslandLayout>
      <Dialog open={isFetching}>
        <div className="loader_padding">
          <CircularProgress size={30} color="inherit" />
        </div>
      </Dialog>
    </PageLayout>
  );
};

export default CreateChannel;
