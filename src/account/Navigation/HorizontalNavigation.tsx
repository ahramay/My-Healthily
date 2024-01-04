import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Button from  '@material-ui/core/Button';
import ButtonIcon from 'styleguide/ButtonIcon';
import { Link } from 'react-router-dom';

export type Props = {
    items?: Array<string>;
    slug?: string;
    onChange?: (val: number) => void | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
    defaultMenu: {
        backgroundColor: Palette.deepPurple.DarkBg,
        color: Palette.Base.White,
        '& .MuiListItemIcon-root': {
            color: Palette.deepPurple.Main,
        },
    },
    activeMenu : {
        backgroundColor: Palette.deepPurple.LightBg,
        color: Palette.deepPurple.Main,
        '& .MuiListItemIcon-root': {
            color: Palette.deepPurple.Main,
        },
        '&:hover': {
            backgroundColor: Palette.deepPurple.LightBg,
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
  }),
);

const HorizontalNavigation:React.FC<Props> = ({
    items=[],
    slug,
    onChange
}) => {
    const classes = useStyles();

    const handleNavigateMenu = (text: any) => {
        const menu = text;
        onChange?.(menu);
    }
    return (
        <>
            {items && items?.map((text, index) => (
                <Box p={1} pt={3.5} key={index}>
                    <Link to={`/${text[1]}`} style={{ textDecoration: 'none' }}>
                    <Button variant="text" color="primary" size="large" disableElevation={true} onClick={() => handleNavigateMenu(text[1])}
                        className={slug === text[1]?.toLowerCase() ? classes.activeMenu : classes.defaultMenu}
                        >
                        <ButtonIcon icon={text[2]} label={text[0]} fontStyle={{ fontSize: '1.4rem'}} />
                    </Button>
                    </Link>
                </Box>
            ))}
        </>
    )
};

export default HorizontalNavigation;