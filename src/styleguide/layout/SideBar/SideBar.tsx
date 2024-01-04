import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import styles from './SideBar.module.css'
import Logo from 'assets/logo.svg';
import Footer from 'assets/footer.svg';
import OpenFooter from 'assets/openFooter.svg';
import Portfolios from 'assets/portfolios.svg';
import Jobs from 'assets/jobs.svg';
import Rule from 'assets/rule.svg';
import Profile from 'assets/profile.svg';
import Scenarios from 'assets/scenarios.svg';
import Setting from 'assets/setting.svg';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 4px)`,
  },
});

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export type Props = {
  children?: any;
}

const SideBar: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const getStyleImg=()=>{
    // 
  }

  const getIcon=(i:number)=>{
    if (i === 0) {
      return <img src={Scenarios} alt=''/>
    }else if (i === 1) {
      return <img src={Portfolios} alt=''/>
    }else if (i === 2) {
      return <img src={Jobs} alt=''/>
    }else if (i === 3) {
      return <img src={Setting} alt=''/>
    }else{
     return <img src={Rule} alt=''/>
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color={"secondary"} className='header'
        sx={{
         width: { sm: open?`calc(100% - 240px)`:`calc(100% - 60px)` },
          ml: { sm: '60px' },
        }}
      >
        <Toolbar>
          <Typography className='headerText'>
            Mini variant drawer
          </Typography>
          <img src={Profile} alt=''/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{height:'9.2%',justifyContent: !open?'center':'flex-start'}}>
          <IconButton sx={{
             minWidth: 0,
             mr: open ? 3 : 'auto',
             justifyContent: 'center',
             px: 2.5
            }}>
            <img src={Logo} alt=''/>
          </IconButton>
        </DrawerHeader>
        {open && <Divider />}
        <List className={styles.icons}>
          {['Scenario', 'Portfolios', 'Rules', 'Settings','General'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'center' : 'center',
                  px: open ? 2.5: 4.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    width:23,height:23,
                    marginRight:2,
                  }}>
                  {getIcon(index)}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 ,color:'#16161A',fontSize:18}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {open&&<Divider/>}
        <ListItemButton onClick={!open? handleDrawerOpen :handleDrawerClose} className={styles.footer}
          sx={{justifyContent:'flex-end'}}>
          <Link to={'/'}>
            {open ? <img src={Footer} alt=''/>:<img src={OpenFooter} alt=''/>}
          </Link>
        </ListItemButton>

      </Drawer>
      <Box sx={{ flexGrow : 1, backgroundColor:'#F4F4F4' , marginTop:'8px', }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default React.memo(SideBar);
