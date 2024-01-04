import { createMuiTheme } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Palette.sapiatTeal.Main,
    },
    secondary: {
      main: Palette.deepMaroon.Main,
    },
  },
});

export default theme;
