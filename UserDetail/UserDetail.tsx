import { CircularProgress } from "@mui/material";
import ProfileEmail from "components/ProfileMenu/components/ProfileEmail";
import ProfilePhone from "components/ProfileMenu/components/ProfilePhone";
import { EditIconSVG, GreenTickSVG, RedCrossSVG } from "components/SVG/SVG";
import { useProfileContext } from "context/Profile/profile";
import useProfileApi from "hooks/apiHooks/Profile/useProfileApi";
import React, { useState } from "react";

const UserDetail = () => {
  const profile = useProfileContext();

  const [isEditing, setIsEditing] = useState(false);

  const isLoading = profile.isLoading;

  const [userName, setUserName] = useState(profile?.userName || "");

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const { changeUserInfo } = useProfileApi();

  const handleSave = () => {
    changeUserInfo(userName);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="profile_user_detail_container">
      <img
        className="profile_logo"
        src={
          profile?.profileDetails?.profilePhoto ||
          "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
        }
        alt="profile"
      />
      <div
        onClick={handleEditClick}
        className="title_and_limit account_padding pointer"
      >
        <h4>Account</h4>
        <EditIconSVG />
      </div>
      {isLoading ? (
        <div className="progress_side_padding">
          <CircularProgress size={15} color="inherit" />
        </div>
      ) : (
        <div className="profile_menu_content_wrapper">
          {isEditing ? (
            <div className="link_edit_save_wrapper social_link_edit_input_wrapper_underline">
              <input
                name="userName"
                value={userName}
                onChange={handleEdit}
                className="social_link_edit_input"
                placeholder="Enter URL"
              />
              <div className="sle_confirm_btns">
                <div className="pointer" onClick={handleSave}>
                  <GreenTickSVG />
                </div>
                <div className="pointer" onClick={handleEditClick}>
                  <RedCrossSVG />
                </div>
              </div>
            </div>
          ) : (
            <p>@{profile?.profileDetails?.userName}</p>
          )}
          <ProfileEmail />
          <ProfilePhone />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
