import * as React from "react";
import Paper from "@mui/material/Paper";
import styles from "./Dashboard.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { Palette } from "utility/Colors/Palette";
import { IconMenu } from "./Menu";
import { IconButton } from "@mui/material";
import MainGraph from "assets/mainGraph.svg";

export type Props = {
  portfolio?: any;
  handleClick?:any;
  menuType?:string;
};

const ItemSubPortfolio: React.FC<Props> = ({ portfolio,handleClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          height: 65,
          mt: 0.5,
          mr: portfolio ? 2 : 0,
        },
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          backgroundColor: "white",
          marginLeft: portfolio ? 0 : 4,
          width: portfolio ? 500 : 550,
        }}
      >
        <Toolbar className={styles.toolbar_subHeader}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: 12, color: Palette.Grey.lightest }}>
              {portfolio ? "Scenario" : "Portfolio"}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>SSA Default</Typography>
          </Box>
          <IconButton aria-label="Example" onClick={handleClick}>
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Toolbar>
      </Paper>
    </Box>
  );
};

export const Leftbardata=[
  {
  title:'RETURN',
  subTitle:'-11.24'
},
  {
  title:'ASSET',
  subTitle:'Real Estate'
},
  {
  title:'CVAR CONTR.',
  subTitle:'-7.43'
},
  {
  title:'VALUATION',
  subTitle:'Jan-22'
},
  {
  title:'HORIZON',
  subTitle:'Dec-27'
},
]
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>,arg:any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  const data = [
    {
      title: "Climate",
      value: "3",
    },
    {
      title: "Climate",
      value: "2",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Climate",
      value: "3",
    },
    {
      title: "Geopolitical",
      value: "2",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
    {
      title: "Geopolitical",
      value: "1",
    },
  ];



  return (
    <>
    <IconMenu anchorEl={anchorEl} open={open} handleClose={handleClose}/>
    <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": {
                width: 1050,
                mt: 4,
                ml: 4,
                mr: 2,
              },
            }}
            >
            <Paper square elevation={0} sx={{ backgroundColor: "white" }}>
              <Toolbar className={styles.toolbar}>
                <Box sx={{ flexGrow: 1 }}>
                  <Toolbar className={styles.toolbar_items}>
                    <Typography
                      sx={{ marginRight: 0.5, fontWeight: "600", fontSize: 15 }}>
                      SSA Committee Default
                    </Typography>
                    <IconButton aria-label="Example">
                    <KeyboardArrowDownIcon sx={{ fontSize: 16 }}/>
                    </IconButton>
                  </Toolbar>
                </Box>
                <Box>
                  <Toolbar className={styles.toolbar_items}>
                    <CalendarTodayIcon sx={{ fontSize: 15, marginRight: 2 }} />
                    <SettingsIcon sx={{ fontSize: 16 }} />
                  </Toolbar>
                </Box>
              </Toolbar>
            </Paper>
          </Box>
          <Grid container spacing={0.5}>
            <Grid item xs={12} md={7}>
              <ItemSubPortfolio handleClick={(e : React.MouseEvent<HTMLElement> )=>handleClick(e,'portfolio')} />
            </Grid>
            <Grid item xs={12} md={5}>
              <ItemSubPortfolio portfolio={true} handleClick={(e : React.MouseEvent<HTMLElement> )=>handleClick(e,'scenario')} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "grid",
                  gridAutoFlow: "row",
                  gridTemplateColumns: "repeat(8, 1fr)",
                  gridTemplateRows: "repeat(2, 25px)",
                  bgcolor: Palette.Base.White,
                  mt: 0.5,
                  ml: 4,
                  mr: 2,
                  height: 65,
                }}
                >
                {data.map((item, index) => (
                  <Box key={index}>
                    <Toolbar className={styles.toolbar_graph_items}>
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          backgroundColor: item.value=='2'?'#A87791':item.value=='3'?'#3531FC':'#EAD943',
                          mr: 0.6,
                          ml: 0.6,
                        }}
                        />
                      <Typography sx={{ fontSize: 12 }}>
                        {item.title}
                      </Typography>
                    </Toolbar>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": {
                width: 1050,
                mt: 0.5,
                ml: 4,
                mr: 2,
                height:510
              },
            }}
            >
            <Paper square elevation={0} sx={{ backgroundColor: "white" }}>
              <Typography>
              <img src={MainGraph} alt='' style={{width: 850,height:500}} />
              </Typography>
            </Paper>
          </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": {
                width: 435,
                height: 730,
                ml: 2,
                position:'fixed',
                mt: 1,
              },
            }}
            className={styles.header}
            >
            <Paper square elevation={0} sx={{ backgroundColor: "white" }} >
            {Leftbardata.map(item=>
             <Box sx={{p:1,pl:4}}>
            <Typography sx={{ fontSize: 16,color:Palette.Grey.lightest,marginTop:2 }}>
             {item.title}
             </Typography>
            <Typography sx={{ fontSize: 25,fontWeight:'100' }}>
             {item.subTitle}
             </Typography>
              </Box>
            )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default React.memo(Dashboard);
