import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#333',
      white: '#fff',
    },
    primary: {
      main: '#2C65D6',
      dark: '#333',
    },
    secondary: {
      main: '#19857b',
      dark: '#333',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F2F2F2',
      paper: '#fff',
    },
  },
});

export default theme;
