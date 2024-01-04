import LineBreak from "components/LineBreak/LineBreak";
import { AddContactSVG, GreenTickSVG, RedCrossSVG } from "components/SVG/SVG";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useProfileContext } from "context/Profile/profile";
import useProfileApi from "hooks/apiHooks/Profile/useProfileApi";
import React, { ChangeEvent, useState } from "react";

const ProfileEmail = () => {
  const profile = useProfileContext();

  const [enterEmail, setEnterEmail] = useState(false);

  const handleAddEmail = () => {
    setEnterEmail(true);
  };

  const handleCloseEmail = () => {
    setEnterEmail(false);
  };

  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { ToastError } = useHiveConfigContext();

  const { updateUserEmail } = useProfileApi();

  const handleSaveEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      updateUserEmail(email);
      handleCloseEmail();
      setEmail("");
    } else {
      ToastError("Please enter a valid email");
    }
  };

  return (
    <div>
      {!!profile?.profileDetails?.email ? (
        <p>{profile?.profileDetails?.email}</p>
      ) : (
        <div>
          {enterEmail ? (
            <div className="link_edit_save_wrapper social_link_edit_input_wrapper_underline">
              <input
                className="social_link_edit_input"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <div className="sle_confirm_btns">
                <div onClick={handleSaveEmail} className="pointer">
                  <GreenTickSVG />
                </div>
                <div onClick={handleCloseEmail} className="pointer">
                  <RedCrossSVG />
                </div>
              </div>
            </div>
          ) : (
            <>
              <LineBreak />
              <div onClick={handleAddEmail} className="contact_empty_add">
                <AddContactSVG />
                <p>Add Email</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileEmail;
