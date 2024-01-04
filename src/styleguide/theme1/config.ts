import { Palette } from 'utility/Colors/Palette';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: Palette.deepGreen.primary,
    },
    secondary: {
      main: Palette.Base.White,
    },
    neutral: {
      main: Palette.Base.White,
    },
  },
});

export default theme;
