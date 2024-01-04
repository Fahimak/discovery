import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Divider from "@mui/material/Divider";
import LineBreak from "components/LineBreak/LineBreak";
import InitializeApp from "components/InitializeApp/InitializeApp";
import { useRouter } from "next/navigation";
import { useProfileContext } from "context/Profile/profile";
import UserDetail from "components/UserDetail";

const ProfileMenu = () => {
  //   const profile = useAppSelector(profileRespSelector);
  const profile = useProfileContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

  const redirect = process.env.REACT_APP_LEGACY_URL;

  const handleRedirect = () => {
    handleClose();
    window.open(
      redirect +
        `?org=${localStorage.getItem("subDomain")}&login=${localStorage.getItem(
          "@jwtToken"
        )}`,
      "_self"
    );
  };

  const vhiveOrg = ["My Hives"];

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("@jwtToken");
    localStorage.setItem("isLoggedIn", "no");
    InitializeApp();
    router.push("/home");
  };

  const handleVhiveOrg = () => {
    window.open(
      `https://vhive.org/?token=${localStorage.getItem("@jwtToken")}`,
      "_blank"
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Tooltip title="Profile">
          <img
            src={
              profile.profileDetails?.profilePhoto ||
              "https://images.veehive.ai/profileImage/defaultAvatar.png"
            }
            className="hive_logo"
            onClick={handleClick}
          />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "250px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <UserDetail />

        <LineBreak />
        <Divider />
        <LineBreak />
        <div className="vhive_org_btns">
          {vhiveOrg.map((data, idx) => {
            return (
              <MenuItem onClick={handleVhiveOrg} key={idx}>
                <p className="text-sm">{data}</p>
              </MenuItem>
            );
          })}
        </div>
        <LineBreak />
        <Divider />
        <LineBreak />
        <MenuItem onClick={handleRedirect}>
          <div className="flex items-center">
            <ListItemIcon>
              <SwapHorizIcon fontSize="small" />
            </ListItemIcon>
            <p className="text-sm font-ibm">Switch to classic</p>
          </div>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <div className="flex items-center">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <p className="text-sm font-ibm">Logout</p>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
