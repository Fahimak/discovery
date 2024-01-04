"use client";
import { CircularProgress } from "@mui/material";
import BackButton from "components/BackButton";
import ChannelTabs from "components/ChannelTabs";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import PageLayout from "components/PageLayout/PageLayout";
import { useChannelContext } from "context/Channel/channel";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useProfileContext } from "context/Profile/profile";
import useChannelApi from "hooks/apiHooks/Channel/useChannelApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChannelAbout = () => {
  const channel = useChannelContext();
  const hiveSettings = useHiveSettingsContext();

  const channelObj = channel.channelDetails?.objChannel;
  const channelProps = channel.channelDetails?.objChannelProperties;

  const [editChannelForm, setEditChannelForm] = useState({
    channelName: channelObj?.channelName || "",
    channelDescription: channelObj?.description || "",
  });

  const { editChannelDetailsAbout, removeChannelLogo } = useChannelApi();

  useEffect(() => {
    hiveSettings.setUrlChanged(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChannelForm = (e: React.ChangeEvent<any>, limit: number) => {
    setEditChannelForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value.slice(0, limit),
    }));
  };

  const handleSave = () => {
    editChannelDetailsAbout(
      editChannelForm.channelName,
      editChannelForm.channelDescription
    );
  };

  const removeLogo = () => {
    removeChannelLogo(
      editChannelForm.channelName,
      editChannelForm.channelDescription
    );
  };

  const isLoading = channel.isLoading;

  return (
    <div>
      {channelObj && (
        <div className="about_container">
          <LineBreak />
          <div className="w_full">
            <div className="title_and_limit">
              <h4>Channel Name*</h4>
              {editChannelForm.channelName && (
                <div className="character_limit text-sm">
                  {editChannelForm.channelName.length}/18
                </div>
              )}
            </div>
            <LineBreak />
            {channelProps?.defaultChannel ? (
              <input
                readOnly
                name="channelName"
                value={editChannelForm.channelName}
                onChange={(e) => handleChannelForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            ) : (
              <input
                name="channelName"
                value={editChannelForm.channelName}
                onChange={(e) => handleChannelForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            )}
          </div>
          <div>
            <div className="title_and_limit">
              <h4>Channel Description</h4>
              {editChannelForm.channelDescription && (
                <div className="character_limit text-sm">
                  {editChannelForm.channelDescription.length}/280
                </div>
              )}
            </div>
            <LineBreak />
            <textarea
              name="channelDescription"
              value={editChannelForm.channelDescription.slice()}
              onChange={(e) => handleChannelForm(e, 280)}
              className="input_border text_padding input_width_full who_are_we_section_text"
              placeholder="A few words about the channel"
            />
          </div>
          <div className="title_and_limit">
            <h4>Channel Logo</h4>
            <p onClick={removeLogo} className="link text-sm">
              Remove Image
            </p>
          </div>
          <IslandLayout>
            <ImageDropzone urlSent={channelProps?.webLogo} file="channel" />
          </IslandLayout>
        </div>
      )}
      <>
        {isLoading ? (
          <div className="nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <>
            {editChannelForm.channelName &&
            editChannelForm.channelName.length > 3 ? (
              <div onClick={handleSave} className="nextBtn primaryBtn">
                Save
              </div>
            ) : (
              <div className="disabledBtn nextBtn">Save</div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ChannelAbout;
