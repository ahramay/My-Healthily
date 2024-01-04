import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from 'assets/SapiatLogo.svg';
import { Palette } from 'utility/Colors/Palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    rootWide: {
      display: 'block',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: 90,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    appContent: {
      minWidth: 1300,
    },
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(6),
    },
    contentWide: {
      flexGrow: 0,
      padding: 0,
    }
  }),
);

export type Props = {
    children?: any;
    navigation1?: any;
    navigation2?: any;
    leftSideBar?: any;
    hideNav?: boolean;
    spacing?: number;
}

const SinglePage: React.FC<Props> = ({ children, navigation1, navigation2, leftSideBar, hideNav, spacing=0 }) => {
    const classes = useStyles();
    return (
        <div className={leftSideBar === '' ? classes.root : classes.rootWide}>
            <CssBaseline />
            <AppBar style={{ backgroundColor: Palette.deepPurple.DarkBg}} position="fixed" className={classes.appBar}>
              <Box display="flex" alignItems="flex-start" className={classes.appContent}>
                <Box flexGrow={1}>
                  <Toolbar>
                  <Typography variant="h6" noWrap>
                      <Box display="flex" flexDirection="row">
                        <Box width={1} height={1} pt={2.5} pr={4}>
                          <img src={logo} alt="SAPIAT" title="SAPIAT" />
                        </Box>
                        {!hideNav ? navigation1 : ''}
                      </Box>
                  </Typography>
                  </Toolbar>
                </Box>
                <Box>
                  <Typography variant="h6" noWrap>
                  <Box display="flex" flexDirection="row">
                    {!hideNav ? navigation2 : ''}
                  </Box>
                  </Typography>
                </Box>
              </Box>
            </AppBar>
            {leftSideBar ? leftSideBar : ''}
            <main className={leftSideBar === '' ? classes.content : classes.contentWide} style={{ margin: 8 * spacing }}>
                {leftSideBar === '' ? 'classes.content' : 'classes.contentWide'}{spacing}
                <Toolbar />
                {children}
            </main>
        </div>
    );
}

export default React.memo(SinglePage);