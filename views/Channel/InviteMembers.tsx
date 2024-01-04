"use client";
import Switch from "@mui/material/Switch";
import BackButton from "components/BackButton";
import ContactInput from "components/ContactInput";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import Loader from "components/Loader";
import PageLayout from "components/PageLayout/PageLayout";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useProfileContext } from "context/Profile/profile";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import { useState } from "react";

const ChannelInvite = () => {
  const channel = useChannelContext();
  const hive = useHiveContext();

  const channelUuid = channel.activeChannelUuid;

  const hiveDetails = hive.hiveDetails;

  const isLoading = channel.isLoading;

  const [emails, setEmails] = useState<string[]>([]);

  const [phoneNos, setPhoneNos] = useState<string[]>([]);

  const phoneUsers = channel.phoneUsers;

  const handlePhoneNumbersChange = (nos: string[]) => {
    setPhoneNos(nos);
    phoneNos.map((item) => {
      phoneUsers.push({ mobileNo: item });
    });
  };

  const handleGetTokenDisplayLabel = (tokenValue: any, tokenMeta: any) => {
    // Could return any react node
    return <div className="rounded-full">{`${tokenValue}`}</div>;
  };

  const handleTokenValueValidate = (e: string) => {
    const number = /^-?\d+$/;
    if (e.startsWith("+")) {
      if (number.test(e.slice(1))) {
        if (e.length > 9 && e.length < 15) {
          return null;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Email", "Phone"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [adminInvite, setAdminInvite] = useState(false);
  const [skipAlert, setSkipAlert] = useState(false);

  const handleAdminInvite = () => {
    setAdminInvite((prevState) => !prevState);
  };

  const profile = useProfileContext();

  const isMember = profile.isMemberView;

  const handleSkipAlert = () => {
    setSkipAlert((prevState) => !prevState);
  };

  const {
    emailAdminInvite,
    emailMemberInvite,
    phoneAdminInvite,
    phoneUserInvite,
  } = useHiveApi();

  const handleSendInvite = () => {
    const emailUsers: {
      email: string;
    }[] = [];

    emails.map((item) => {
      emailUsers.push({ email: item });
    });

    const phoneData = {
      users: phoneUsers,
      channels: [channel.activeChannelUuid],
      communityId: hiveDetails?.communityId!,
      skipEmails: skipAlert,
    };
    const emailData = {
      users: emailUsers,
      channels: [channel.activeChannelUuid],
      communityId: hiveDetails?.communityId!,
      skipEmails: skipAlert,
    };

    if (selectedTab === 0) {
      if (adminInvite) {
        emailAdminInvite(emailData, true);
      } else {
        emailMemberInvite(emailData, true);
      }
    } else {
      if (adminInvite) {
        phoneAdminInvite(phoneData, true);
      } else {
        phoneUserInvite(phoneData, true);
      }
    }
  };

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="add_contact_container">
          <BackButton to={`/channels/${channelUuid}`} />
          <LineBreak />
          <h3>Invite Members</h3>
          <ContactInput
            tabs={tabs}
            handleChange={handleChange}
            emails={emails}
            setEmails={setEmails}
            phoneNos={phoneNos}
            setPhoneNos={handlePhoneNumbersChange}
            selectedTab={selectedTab}
            phoneUsers={phoneUsers}
          />{" "}
          <div className="members_invite_toggles">
            <div className="member_setting_container">
              <Switch checked={adminInvite} onChange={handleAdminInvite} />
              <p>Invite as admin - Default access to all public channels.</p>
            </div>
            <div className="member_setting_container">
              <Switch checked={!skipAlert} onChange={handleSkipAlert} />
              <p>
                Send notifications - Send invite notification as email or sms.
              </p>
            </div>
          </div>
          {emails.length > 0 || phoneNos.length > 0 ? (
            <div onClick={handleSendInvite} className="nextBtn primaryBtn">
              Send Invites
            </div>
          ) : (
            <div className="nextBtn disabledBtn">Send Invites</div>
          )}
          {isLoading && <Loader isLoading={isLoading} />}
        </div>
      </IslandLayout>
    </PageLayout>
  );
};

export default ChannelInvite;
