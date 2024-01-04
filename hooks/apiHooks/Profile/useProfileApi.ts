"use client";
import api from "api";
import { getProfileApi } from "api/actions/Profile/profile";
import axios from "axios";
import { useGlobalContext } from "context/config";
import { useProfileContext } from "context/Profile/profile";
import { usePathname, useRouter } from "next/navigation";

export const useProfileApi = () => {
  const globalState = useGlobalContext();
  const profileState = useProfileContext();

  const router = useRouter();

  const getProfile = async () => {
    globalState.setIsLoading(true);
    try {
      const response = await getProfileApi();
      getGeoInfoJson();
      if (response.responseInfo.httpCode === 200) {
        profileState.setProfileDetails(response.data);
        profileState.setUserId(response.data.userId);
        profileState.setUserName(response.data.userName);
        localStorage.setItem("isLoggedIn", "yes");
      } else {
        localStorage.removeItem("@jwtToken");
        localStorage.setItem("isLoggedIn", "no");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    globalState.setIsLoading(false);
  };

  const changeUserInfo = async (passedUserName: string) => {
    profileState.setIsLoading(true);
    try {
      const response = await api.profile.changeUserInfo({
        userName: passedUserName,
      });
      getGeoInfoJson();
      if (response.data.responseInfo.httpCode === 200) {
        getProfile();
      } else {
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    profileState.setIsLoading(false);
  };

  const updateUserEmail = async (passedEmail: string) => {
    profileState.setIsLoading(true);
    try {
      const response = await api.profile.updateUserEmail({
        email: passedEmail,
      });
      getGeoInfoJson();
      if (response.data.responseInfo.httpCode === 200) {
        getProfile();
      } else {
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    profileState.setIsLoading(false);
  };

  const updateUserPhone = async (passedNo: string, passedCode: string) => {
    profileState.setIsLoading(true);
    try {
      const response = await api.profile.updateUserPhone({
        mobileNo: passedNo,
        countryCode: passedCode,
      });
      getGeoInfoJson();
      if (response.data.responseInfo.httpCode === 200) {
        getProfile();
      } else {
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    profileState.setIsLoading(false);
  };

  const getGeoInfoJson = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        localStorage.setItem("countryCode", data.country_code);
      })
      .catch((error) => {});
  };

  return {
    getProfile,
    changeUserInfo,
    updateUserEmail,
    updateUserPhone,
  };
};

export default useProfileApi;
