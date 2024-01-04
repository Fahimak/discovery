import LineBreak from "components/LineBreak/LineBreak";
import { AddContactSVG, GreenTickSVG, RedCrossSVG } from "components/SVG/SVG";
import React, { ChangeEvent, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CountryData } from "react-phone-input-2";
import { useProfileContext } from "context/Profile/profile";
import useProfileApi from "hooks/apiHooks/Profile/useProfileApi";

const ProfilePhone = () => {
  const profile = useProfileContext();

  const [enterPhone, setEnterPhone] = useState(false);

  const handleAddPhone = () => {
    setEnterPhone(true);
  };

  const handleClosePhone = () => {
    setEnterPhone(false);
  };

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");

  const handleChange = (value: string, country: CountryData) => {
    setPhone(value);
    setCountry(country.countryCode.toUpperCase());
  };

  const { updateUserPhone } = useProfileApi();

  const handleSavePhone = () => {
    updateUserPhone(phone, country);
    handleClosePhone();
    setCountry("");
    setPhone("");
  };

  return (
    <div>
      {!!profile?.profileDetails?.phoneNo ? (
        <p>{profile?.profileDetails?.phoneNo}</p>
      ) : (
        <div>
          <LineBreak />
          {enterPhone ? (
            <div className="link_edit_save_wrapper">
              {/* <input
                className="social_link_edit_input"
                placeholder="Enter Email"
                name="email"
                value={phone}
                onChange={handleChange}
              /> */}
              <PhoneInput
                country={(
                  localStorage.getItem("countryCode") || ""
                ).toLowerCase()} // Set the default country
                value={phone}
                onChange={handleChange}
                inputStyle={{
                  width: "100%",
                  outline: "none",
                  fontFamily: "IBM Plex Sans Condensed",
                  fontStyle: "normal",
                  fontSize: "14px",
                }}
              />
              <div className="sle_confirm_btns">
                <div onClick={handleSavePhone} className="pointer">
                  <GreenTickSVG />
                </div>
                <div onClick={handleClosePhone} className="pointer">
                  <RedCrossSVG />
                </div>
              </div>
            </div>
          ) : (
            <>
              <LineBreak />
              <div onClick={handleAddPhone} className="contact_empty_add">
                <AddContactSVG />
                <p>Add Phone</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhone;
