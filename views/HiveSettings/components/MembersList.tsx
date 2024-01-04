import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LineBreak from "components/LineBreak";
import PageNumbers from "components/PageNumbers";
import moment from "moment";
import ReactTimeAgo from "react-time-ago";
import { useEffect } from "react";
import BackButton from "components/BackButton";
import HiveTabs from "./HiveSettingsTab";
import MembersKebab from "components/MembersKebab";
import { MembersItemModel } from "api/models/Hive/hiveMembers";
import useHiveSettingsApi from "hooks/apiHooks/Hive/useHiveSettingsApi";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { usePathname, useRouter } from "next/navigation";

const MembersList = () => {
  const hive = useHiveContext();
  const hiveSettings = useHiveSettingsContext();

  const hiveMembers = hive.hiveMembers;
  const hiveDetails = hive.hiveDetails;
  const totalPages = hive.hiveMembers?.totalPages;
  const currentPageNo = hiveSettings.pageNo;

  const { getHiveMembers } = useHiveSettingsApi();

  const handleNextPage = (pageNo: number) => {
    getHiveMembers({
      hiveId: hiveDetails?.communityId!,
      pageNo: pageNo,
      contentLimit: 15,
    });
    hiveSettings.setPageNo(pageNo);
  };

  const navigate = useRouter();

  useEffect(() => {
    hiveSettings.setPageNo(0);
    hiveDetails &&
      getHiveMembers({
        hiveId: hiveDetails?.communityId,
        pageNo: currentPageNo,
        contentLimit: 15,
      });
  }, [hiveDetails]);

  const handleInvite = () => {
    // navigate("invite");
  };

  const path = usePathname();

  const handleUserClick = (user: MembersItemModel) => {
    // dispatch(setClickedProfileId(user.profileId));
    // navigate(`/user/${user.profileId}`, { state: { from: path.pathname } });
  };

  return (
    <div className="">
      <LineBreak />
      <div className="hive_members_head">
        <h3>Members</h3>
        {/* <div className="flex">
          <div onClick={handleInvite} className="secondaryBtn button_with_logo">
            <img
              src="https://imagesdev.veehive.ai/webApp/webApp_upload.png"
              className="smallLogo"
            />
            <p>Invite</p>
          </div>
        </div> */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="members table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="bold_heading_table">Username</p>
              </TableCell>
              <TableCell align="left">
                <p className="bold_heading_table">Email</p>
              </TableCell>
              <TableCell align="left">
                <p className="bold_heading_table">Type</p>
              </TableCell>
              <TableCell align="left">
                <p className="bold_heading_table">Joined</p>
              </TableCell>
              <TableCell align="left">
                <p className="bold_heading_table">Action(s)</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!hiveMembers &&
              !!hiveMembers.content &&
              hiveMembers.content?.map((member, idx) => (
                <TableRow
                  className="table_cell_hover"
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    onClick={() => handleUserClick(member)}
                    component="th"
                    scope="row"
                  >
                    {member.userName || "-"}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserClick(member)}
                    align="left"
                  >
                    {(member.userContactDetails &&
                    member.userContactDetails.length > 20
                      ? member.userContactDetails.slice(0, 20) + "..."
                      : member.userContactDetails) || "-"}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserClick(member)}
                    align="left"
                  >
                    {member.isSuperAdmin
                      ? "Owner"
                      : member.isModerator
                      ? "Admin"
                      : "User"}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserClick(member)}
                    align="left"
                  >
                    {" "}
                    {member.dateJoined !== "not joined" ? (
                      <ReactTimeAgo
                        date={
                          new Date(
                            moment
                              .utc(
                                member.dateJoined
                                  .replace(/\.\d+/g, "")
                                  .replace(" ", "T")
                                  .replace(/[-:]/g, "")
                              )
                              .local()
                              .format("LLL")
                          )
                        }
                        locale="en-GB"
                      />
                    ) : (
                      "Not Joined"
                    )}
                  </TableCell>
                  <TableCell>
                    <MembersKebab
                      isSuper={member.isSuperAdmin}
                      hiveMember={true}
                      userId={member.userId}
                      userName={member.userName}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LineBreak />

      <PageNumbers
        handleChange={handleNextPage}
        totalPages={totalPages || 1}
        initialPage={currentPageNo}
      />
    </div>
  );
};

export default MembersList;
