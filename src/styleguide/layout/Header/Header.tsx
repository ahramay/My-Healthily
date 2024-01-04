import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Profile from 'assets/profile.svg';

export type Props = {
  headerName?: any;
}

const Header: React.FC<Props> = ({ headerName }) => {
  return(
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='secondary'
        className='header'
        sx={{
          width: { sm: `calc(100% - 60px)` },
          ml: { sm: '60px' },
        }}
      >
        <Toolbar>
          <Typography className='headerText'>
           {headerName}
          </Typography>
          <img src={Profile} alt=''/>
        </Toolbar>
      </AppBar>
      </Box>
    </div>
  )
}

export default React.memo(Header);
