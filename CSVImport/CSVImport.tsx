import Papa from "papaparse";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CircularProgress } from "@mui/material";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useChannelContext } from "context/Channel/channel";

interface Props {
  selectedTab: number;
  emails: string[];
  setPhoneNos: Dispatch<SetStateAction<string[]>>;
  phoneUsers: { mobileNo: string; userName?: string; userGroup?: string }[];
  phoneNos: string[];
}

const CSVImport = ({
  selectedTab,
  emails,
  setPhoneNos,
  phoneUsers,
  phoneNos,
}: Props) => {
  const hiveConfig = useHiveConfigContext();

  const { ToastInfo, ToastSuccess, ToastError } = useHiveConfigContext();

  const channel = useChannelContext();

  useEffect(() => {
    hiveConfig.setCsvErrorMessage("");
    hiveConfig.setCsvSuccessMessage("");
    hiveConfig.setImportCount(0);
  }, []);

  const importCount = hiveConfig.importCount;

  const [isLoading, setIsLoading] = useState(false);

  const csvImportHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files![0].type === "text/csv"
    ) {
      setIsLoading(true);
      hiveConfig.setCsvErrorMessage("");
      Papa.parse(event.target.files![0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          let data = results.data;

          if (selectedTab === 0) {
            try {
              data.map((row: any, index: number) => {
                if (row.email) {
                  emails!.push(row.email);
                  hiveConfig.setCsvSuccessMessage(
                    `Added ${data.length} emails for Invitation, Please proceed or add more.`
                  );
                  hiveConfig.setCsvErrorMessage("");
                  if (index < 1) {
                    hiveConfig.setImportCount(importCount + data.length);
                  }
                } else {
                  hiveConfig.setCsvErrorMessage(
                    `Make sure your .csv file has an "email" column`
                  );
                  hiveConfig.setCsvSuccessMessage("");
                }
              });
            } catch {
              hiveConfig.setCsvErrorMessage(
                `Make sure your .csv file has an "email" column header under which all user email id's are given`
              );
              hiveConfig.setCsvSuccessMessage("");
            }
          } else {
            try {
              data.map((row: any, index: number) => {
                if (row.mobileNo) {
                  const number = /^-?\d+$/;
                  if (row.mobileNo.startsWith("+")) {
                    if (number.test(row.mobileNo.slice(1))) {
                      if (row.mobileNo.length > 9 && row.mobileNo.length < 15) {
                        // mainViewModel.phoneNos.push(row.mobileNo);
                        phoneNos.push(row.mobileNo);
                        channel.setPhoneUsers((prevPhoneUsers) => [
                          ...prevPhoneUsers,
                          {
                            mobileNo: row.mobileNo,
                            userOrigin: row.userOrigin || "",
                            userName: row.userName || "",
                          },
                        ]);

                        hiveConfig.setCsvSuccessMessage(
                          `Added ${data.length} phone numbers for Invitation, Please proceed or add more.`
                        );
                        hiveConfig.setCsvErrorMessage("");
                      } else {
                        ToastInfo("Number length should be 10");
                      }
                    } else {
                      ToastInfo("only numbers allowed");
                    }
                  } else {
                    ToastInfo("Number should start with '+'");
                  }

                  if (index < 1) {
                    hiveConfig.setImportCount(importCount + data.length);
                  }
                } else {
                  hiveConfig.setCsvErrorMessage(
                    `Make sure your .csv file has an "mobileNo" column`
                  );
                  hiveConfig.setCsvSuccessMessage("");
                }
              });
            } catch {
              hiveConfig.setCsvErrorMessage(
                `Make sure your .csv file has an "mobileNo" column header under which all user email id's are given`
              );
              hiveConfig.setCsvSuccessMessage("");
            }
            // mainViewModel.splitCSVImport();
          }
        },
      });
    } else {
      hiveConfig.setCsvSuccessMessage("");
      hiveConfig.setCsvErrorMessage(
        `INVALID FILE TYPE! Please upload .csv File`
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* File Uploader */}
      <input
        id="fileElem"
        onChange={csvImportHandler}
        type="file"
        name="file"
        accept=".csv"
        className="invisible"
        // style={{ display: "block", margin: "10px auto" }}
      />
      <div className="import_csv_btn">
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <label className="primaryBtn half_width" htmlFor="fileElem">
            Import .csv file
          </label>
        )}
      </div>
    </div>
  );
};

export default CSVImport;
