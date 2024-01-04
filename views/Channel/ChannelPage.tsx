import { ChannelItemModel } from "api/models/Channel/channelDetails";
import ChannelInfo from "./ChannelInfo";
import ChannelPageInit from "./context/ChannelPageInit";

interface Props {
  channel: ChannelItemModel;
}

const ChannelPage = ({ channel }: Props) => {
  return (
    <div>
      <ChannelPageInit channelUuid={channel.objChannel.channelUUID} />
      <ChannelInfo channel={channel} />
    </div>
  );
};

export default ChannelPage;
