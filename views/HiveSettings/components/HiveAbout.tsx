import { CircularProgress } from "@mui/material";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { useAboutPageContext } from "../useHiveAbout";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const HiveAbout = () => {
  const { handleHiveForm, handleSave, editHiveForm } = useAboutPageContext();

  const hive = useHiveContext();
  const hiveSettings = useHiveSettingsContext();

  const { ToastSuccess, ToastInfo, ToastError } = useHiveConfigContext();

  const handleError = () => {
    ToastError("Hive name should be of atleast 3 characters");
  };

  const handleContextError = () => {
    ToastError("Set a detailed context of your hive for your Ai bot");
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <div className="about_container">
            <LineBreak />
            <div>
              <div className="title_and_limit">
                <h4>Hive Name</h4>
                {editHiveForm.hiveName && (
                  <div className="character_limit text-sm">
                    {editHiveForm.hiveName.length}/18
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <input
                name="hiveName"
                value={editHiveForm.hiveName!}
                onChange={(e) => handleHiveForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            </div>
            <div>
              <div className="title_and_limit">
                <h4>Who are we</h4>
                {editHiveForm.hiveDescription && (
                  <div className="character_limit text-sm">
                    {editHiveForm.hiveDescription.length}/280
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <textarea
                name="hiveDescription"
                value={editHiveForm.hiveDescription!}
                onChange={(e) => handleHiveForm(e, 280)}
                className="input_border text_padding input_width_full who_are_we_section_text"
                placeholder="A few words about the channel"
              />
            </div>
            <div>
              <h4>Contact Us</h4>
              <LineBreak />
              <div className="input_border text_padding input_width_full input_container_w_border">
                <input
                  name="hiveAddress"
                  value={editHiveForm.hiveAddress}
                  onChange={(e) => handleHiveForm(e, 80)}
                  className="input_width_full input_within_border"
                  placeholder="Eg: Hive city, Country"
                />
                <div className="character_limit text-sm char_limit_input">
                  {editHiveForm.hiveAddress.length}/80
                </div>{" "}
              </div>
              <p className="small_helper_text">
                Enter your address that you want to show in the contact us
                section.
              </p>
              <LineBreak />
              <div className="input_border text_padding input_width_full input_container_w_border">
                <input
                  name="hiveEmail"
                  type="email"
                  value={editHiveForm.hiveEmail}
                  onChange={(e) => handleHiveForm(e, 28)}
                  className="input_width_full input_within_border"
                  placeholder="Eg: hive@hive_email.com"
                />
                <div className="character_limit text-sm char_limit_input">
                  {editHiveForm.hiveEmail.length}/28
                </div>{" "}
              </div>
              <p className="small_helper_text">
                Enter your email that you want to be contact with.
              </p>
            </div>
            {/* <SocialLinkEdit
            editHiveForm={editHiveForm}
            handleHiveForm={handleHiveForm}
          /> */}
            <div className="hive_setting_switch_container">
              <div className="hive_setting_switch_wrapper">
                <Switch
                  checked={hive.isPrivate}
                  onChange={(event) => hive.setIsPrivate(event.target.checked)}
                />
                <p>Set hive visibility to private</p>
              </div>
              <div className="hive_setting_switch_wrapper">
                <Switch
                  checked={hive.showSuggested}
                  onChange={(event) =>
                    hive.setShowSuggested(event.target.checked)
                  }
                />
                <p>Show suggested hives</p>
              </div>
              <div className="hive_setting_switch_wrapper">
                <Switch
                  checked={hive.showChatbot}
                  onChange={(event) =>
                    hive.setShowChatBot(event.target.checked)
                  }
                />
                <p>Enable ChatBot</p>
              </div>
            </div>
            {/* {hive.showChatbot && (
            <div>
              <LineBreak />
              <div className="title_and_limit">
                <h4>Set context*</h4>
                {editHiveForm.hiveDescription && (
                  <div className="character_limit text-sm">
                    {hiveContext.length}/3000
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <p>
                Elaborate on your hive's characteristics, functionalities, and
                capabilities to enable our AI to construct a brand twin for your
                hive.
              </p>
              <LineBreak />
              <textarea
                name="hiveContext"
                value={hiveContext}
                onChange={handleContextChange}
                className="input_border text_padding input_width_full who_are_we_section_text"
                placeholder="An extensive description about your hive"
              />
              <LineBreak />
              <h4>Products</h4>
              <LineBreak />
              <HiveProducts />
            </div>
          )} */}
          </div>
        </CssVarsProvider>
      </StyledEngineProvider>
      <>
        {hiveSettings.isLoading ? (
          <div className="nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <>
            {hive.showChatbot ? (
              <>
                {editHiveForm.hiveName && editHiveForm.hiveName.length > 2 ? (
                  <div onClick={handleSave} className="nextBtn primaryBtn">
                    Save
                  </div>
                ) : (
                  <div
                    onClick={handleContextError}
                    className="nextBtn disabledBtn"
                  >
                    Save
                  </div>
                )}
              </>
            ) : (
              <>
                {editHiveForm.hiveName && editHiveForm.hiveName.length > 2 ? (
                  <div onClick={handleSave} className="nextBtn primaryBtn">
                    Save
                  </div>
                ) : (
                  <div onClick={handleError} className="nextBtn disabledBtn">
                    Save
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default HiveAbout;
