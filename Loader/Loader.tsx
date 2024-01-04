import { CircularProgress, Dialog } from "@mui/material";

interface Props {
  isLoading: boolean;
}

const Loader = ({ isLoading }: Props) => {
  return (
    <Dialog open={isLoading}>
      <div className="loader_padding">
        <CircularProgress size={30} color="inherit" />
      </div>
    </Dialog>
  );
};

export default Loader;
