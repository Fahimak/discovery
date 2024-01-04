import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useState } from "react";

const ChannelDropdown = () => {
  const channelC = useChannelContext();
  const hiveC = useHiveContext();

  const channelList = hiveC.channelList;
  const channelUuid = channelC.activeChannelUuid;

  const [channel, setChannel] = useState(
    channelUuid || channelList[0].channelUuid || ""
  );

  const handleChange = (channel: SelectChangeEvent) => {
    setChannel(channel.target.value);
    channelC.setActiveChannel(channel.target.value);
  };

  return (
    <div className="">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Uploading to</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={channel}
          label="Uploading to"
          onChange={handleChange}
        >
          {channelList.map((channel, idx) => {
            if (channel.channelUuid) {
              return (
                <MenuItem key={idx} value={channel.channelUuid}>
                  {channel.channelName}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChannelDropdown;
