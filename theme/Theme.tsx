import { blueGrey, grey, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: orange[500],
    },
    background: {
      default: grey[50],
    },
  },
});

export default theme;
