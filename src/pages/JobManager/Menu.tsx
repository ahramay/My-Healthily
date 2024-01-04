import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import styles from "./JobManager.module.css";
import { Box, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Palette } from "utility/Colors/Palette";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export type Props = {
  open?: any;
  anchorEl?: any;
  handleClose?: any;
  portfolio?:any;
};
const options = [
  {
    title: "Advanced Emerging Equities",
    value: "1",
  },
  {
    title: "SSA Default",
    value: "2",
  },
  {
    title: "FTSE Russell German Gov 7 - 10 Year",
    value: "3",
  },
  {
    title: "Australia Equities",
    value: "4",
  },
  {
    title: "Australia Equities",
    value: "5",
  },
];

export const IconMenu: React.FC<Props> = ({ anchorEl, open, handleClose,portfolio }) => {
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 0,
      minWidth: 350,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 2px 10px 10px 2px, rgba(0, 0, 0, 0.02) 0px 4px 6px 2px",
      "& .MuiMenu-list": {
        padding: "8px 16px 8px 16px",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(10),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
    "& .MuiMenuItem-root": {
      paddingLeft: 0,
      paddingTop: 4,
      paddingBottom: 4,
    },
  }));

  return (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >{portfolio?
      <Box>
        <Box sx={{flexGrow:1}}>
        <Toolbar disableGutters={true} className={styles.toolbar_item_menu}>
          <ArrowBackIosRoundedIcon sx={{marginRight:0.5,fontSize: 13,color:Palette.Grey.lightest }} />
        <Typography sx={{ color: Palette.Grey.lightest, fontSize: 11 }}>
          back
        </Typography>
        </Toolbar>
        </Box>
      </Box>
      :
      <Box>
      <Toolbar disableGutters={true} className={styles.toolbar_search_menu}>
        <Box sx={{flexGrow:1}}>
        <Toolbar disableGutters={true} className={styles.toolbar_item_menu}>
          <SearchIcon fontSize="small" sx={{marginRight:1.5}} />
          <InputBase
            placeholder="Search for a Portfolio"
            inputProps={{ "aria-label": "search portfolio" }}
            sx={{fontSize:13,width:'80%'}}
            />
        </Toolbar>
        </Box>
        <Typography sx={{ color: Palette.Grey.lightest, fontSize: 11 }}>
          clear
        </Typography>
        </Toolbar>
      </Box>}
      <MenuList>
        <Divider sx={{marginBottom:1}}/>
        {options.map((option) => (
          <>
            <MenuItem key={option.value} onClick={handleClose}>
              <ListItemText>
                <Typography className={styles.item_menu}>
                  {option.title}
                </Typography>
              </ListItemText>
            </MenuItem>
            {option.value !== "5" && <Divider />}
          </>
        ))}
      </MenuList>
    </StyledMenu>
  );
};
