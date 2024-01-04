import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidthXl = 304;
const drawerWidthMd = 200;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidthXl,
        flexShrink: 0,
        '@media (min-width: 768px) and (max-width: 1500px)': {
            maxWidth: drawerWidthMd,
        },
    },
    drawerPaper: {
        width: drawerWidthXl,
        '@media (min-width: 768px) and (max-width: 1500px)': {
            maxWidth: drawerWidthMd,
        },
    },
    drawerContainer: {
        overflow: 'auto',
        paddingTop: 20,
        '& .MuiListItemIcon-root': {
            minWidth: 30,
        },
        '& .MuiListItem-button:hover': {
            color: Palette.deepPurple.Dark,
            '& .MuiListItemIcon-root': {
                color: Palette.deepPurple.Dark,
            }
        },
    },
    activeMenu : {
        backgroundColor: Palette.deepPurple.LightBg,
        color: Palette.deepPurple.Main,
        '& .MuiListItemIcon-root': {
            color: Palette.deepPurple.Main,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
  }),
);

export type Props = {
    items?: Array<string>;
    slug?: string;
    onChange?: (val: number) => void | undefined;
}

const Navigation: React.FC<Props> = ({
    items=[],
    slug,
    onChange
}) => {
    const classes = useStyles();

    const handleNavigateMenu = (index: any) => {
        const menu = index;
        onChange?.(menu);
    }

    return (
        <Drawer className={classes.drawer}  variant="permanent"  classes={{ paper: classes.drawerPaper }}>
            <Toolbar />
            <Box className={classes.drawerContainer}>
                <List>
                    {items && items?.map((text, index) => (
                    <ListItem onClick={() => handleNavigateMenu(index)}
                    button key={text} className={slug === text[0]?.toLowerCase() ? classes.activeMenu : ''}>
                        {text[2] && 
                            <ListItemIcon>{text[2]}</ListItemIcon>
                        }
                        <ListItemText primary={text[0]} />
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default Navigation;