"use client";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import NavLogo from "./components/NavLogo";
import Buttons from "components/Buttons";
import { useProfileContext } from "context/Profile/profile";
import ProfileMenu from "components/ProfileMenu";

const Navbar = () => {
  const state = useHiveComponentsContext();

  const profile = useProfileContext();

  return (
    <div className="navbar_wrapper">
      <div className="navbar_container">
        <div className="navbar_content">
          <NavLogo />
          <div className="navbar_buttons">
            {/* <div
              onClick={() => dispatch(setOpenDownloads(true))}
              className="pointer secondaryBtn"
            >
              {inProgress ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress size={20} color="inherit" />

                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      padding: "4px",
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ProgressSVG />
                  </Box>
                </Box>
              ) : (
                <ProgressSVG />
              )}
            </div> */}

            {state.navbarItems.map((navItem, idx) => {
              return (
                <Buttons key={idx} button={navItem}>
                  {navItem.componentName}
                </Buttons>
              );
            })}
            {!!profile?.userId &&
              localStorage.getItem("isLoggedIn") === "yes" && <ProfileMenu />}
          </div>
        </div>
      </div>
      {/* <Downloads /> */}
    </div>
  );
};

export default Navbar;
