import { Typography, AppBar } from '@material-ui/core';
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notification from './components/Notification';

function App() {
  return (
    <div>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">QuickTalk</Typography>
      </AppBar>

      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  );
}

export default App;
