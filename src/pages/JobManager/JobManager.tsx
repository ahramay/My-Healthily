import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import styles from "./JobManager.module.css";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import { Palette } from "utility/Colors/Palette";
import DatePicker from "./DatePicker";
import path from "assets/path.svg";
import line from "assets/line.svg";
import button from "assets/button.svg";
import Fills from "assets/Fills.svg";
import Ellipse from "assets/Ellipse.svg";
import TodoList from "./TodoList";
import TodoListed from "./TodoListed";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";
export type Props = {
  portfolio?: any;
  handleClick?: any;
  menuType?: string;
};

const StyledIconsBox = styled(Box)({
  "& .MuiSvgIcon-root": {
    color: "#707070",
    fontSize: "medium",
  },
  color: "#707070",
});
const StyledCardContainer = styled(Box)({
  padding: "2px",
  backgroundColor: "white",
  borderStyle: "solid",
  borderBlockColor: "#C6C6C6",
  borderLeftColor: "#C6C6C6",
  borderRightColor: "#C6C6C6",
  width: 870,
});

const StyledCardHeading = styled(Typography)({
  fontSize: "17px",
  marginLeft: "30px",
  color: "#014547",
});
const StyleddropContainer = styled(Box)({
  padding: "2px",
  backgroundColor: "white",
  width: 420,
});

const StyleddropHeading = styled(Typography)({
  fontSize: "17px",
  marginLeft: "30px",
  color: "#014547",
});
const Styleddroppag = styled(Typography)({
  color: "#16161A",
  opacity: ".60",
  fontsize: "10px",
  lineHeight: "24.24px",
  marginLeft: "70px",
  alignItems: "center",
  marginTop: 80,
});
const StyledCardContainers = styled(Box)({
  padding: "2px",
  backgroundColor: "white",
  borderBlockEnd: "2px solid #C6C6C6",
  width: 370,
  marginLeft: 25,
});

const StyledCardsHeading = styled(Typography)({
  fontSize: "17px",
  marginRight: "20%",
  color: "#014547",
});
const StyledCardPag = styled(Typography)({
  color: "#16161A",
  opacity: ".60",
  fontsize: "10px",
  lineHeight: "24.24px",
  width: "450px",
  marginLeft: "30px",
});
const StyledSearchField = styled(TextField)({
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  "& .MuiFilledInput-root": {
    display: "flex",
    alignItems: "baseline",
    // border: "2px solid #A87791",
    borderRadius: "inherit",
    outline: "none",
  },
});

export const Leftbardata = [
  {
    title: "PORTFOLIO NAME",
    subTitle: "Climate 2-5-10Y",
  },
  {
    title: "TOTAL COUNT",
    subTitle: "4",
  },
  {
    title: "ASSET CLASS COUNT",
    subTitle: "23",
  },
];
export const dropdown = [
  {
    id: 1,
    title: "SSA Default",
    isDone: false,
  },
  {
    id: 2,
    title: "LDI candidate",
    isDone: false,
  },
  {
    id: 3,
    title: "Social Impact",
    isDone: false,
  },
  {
    id: 4,
    title: "SSA Default",
    isDone: false,
  },
];
export const dropsdown = [
  {
    title: "Outlook Scnearios",
  },
  {
    title: "Downside Scenarios",
  },
  {
    title: "SAA Outlook",
  },
  {
    title: "Climate 2-5-10Y",
    // subtitle: { Fill },
  },
];

export const dropsdown1 = [
  {
    title: "Strategic Asset Allocation Strategic Asset Allocat",
  },
  {
    title: "Strategic Asset Allocation Strategic Asset Allocat",
  },
  {
    title: "Strategic Asset Allocation Strategic Asset Allocat",
  },
  {
    title: "Strategic Asset Allocation Strategic Asset Allocat",
  },
];

const JobManager: React.FC = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };
  const [todos, setTodos] = useState<Array<Todo>>(dropdown);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <Box className={styles.container}>
                <Box className={styles.bloc_tabs}>
                  <Button
                    variant="outlined"
                    className={
                      toggleState === 1
                        ? `${styles.tabs} ${styles.active_tabs}`
                        : styles.tabs
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Portfolios
                  </Button>
                  <Button
                    variant="outlined"
                    disabled
                    className={
                      toggleState === 2
                        ? `${styles.tabs} ${styles.active_tabs}`
                        : styles.tabs
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Scenarios
                  </Button>
                  <Button
                    variant="outlined"
                    disabled
                    className={
                      toggleState === 3
                        ? `${styles.tabs} ${styles.active_tabs}`
                        : styles.tabs
                    }
                    onClick={() => toggleTab(3)}
                  >
                    Rules
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Paper
                  square
                  elevation={1}
                  sx={{
                    backgroundColor: "white",
                    marginTop: 4.9,
                    marginLeft: 6.8,
                    flexGrow: 1,
                    padding: 2,
                  }}
                >
                  <Grid>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Box>
                        <TodoList
                          todos={todos}
                          setTodos={setTodos}
                          CompletedTodos={CompletedTodos}
                          setCompletedTodos={setCompletedTodos}
                        />
                      </Box>
                    </DragDropContext>
                  </Grid>
                </Paper>
              </Grid>
            </Box>
            <Grid
              container
              spacing={1}
              wrap="nowrap"
              sx={{
                marginTop: 1,
                marginLeft: 4.5,
                marginBottom: 3,
              }}
            >
              <Grid item md={2.9}>
                <Paper square elevation={1}>
                  <Box
                    className={styles.file_card}
                    sx={{
                      display: "flex",
                      width: 200,
                      height: 200,
                      // ml: 2,
                      mt: 1,
                    }}
                  >
                    <Box className={styles.file_inputs}>
                      <input
                        className={styles.input}
                        accept="file/*"
                        id="upload"
                        type="file"
                      />
                      <i className={styles.i}>
                        <img src={path} alt="" />
                      </i>
                    </Box>
                  </Box>
                  <Box className={styles.line}>
                    <i className={styles.i}>
                      <img src={line} alt="" />
                    </i>
                  </Box>
                  <Box className={styles.file_button}>
                    <i className={styles.i}>
                      <img src={button} alt="" />
                    </i>
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={5.5}>
                <Grid item>
                  <Box
                    sx={{
                      display: "flex",
                      "& > :not(style)": {
                        width: 500,
                        height: 262.5,
                        // ml: 2,
                        mt: 1,
                      },
                    }}
                  >
                    <Paper
                      square
                      elevation={1}
                      sx={{ backgroundColor: "white" }}
                    >
                      <Grid item md={3}>
                        <StyledCardContainers>
                          <StyledSearchField
                            id="filled-search"
                            type="search"
                            variant="filled"
                            placeholder="Search field 2"
                            size="small"
                            InputProps={{
                              disableUnderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CheckIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </StyledCardContainers>
                        <StyleddropContainer>
                          <Styleddroppag>
                            drag items from the top into this box
                          </Styleddroppag>
                        </StyleddropContainer>
                        <Grid>
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Box>
                              <TodoListed
                                todos={todos}
                                setTodos={setTodos}
                                CompletedTodos={CompletedTodos}
                                setCompletedTodos={setCompletedTodos}
                              />
                            </Box>
                          </DragDropContext>
                        </Grid>
                        {/* <div style={{ display: "flex" }}>
                          <Grid container columns={{ lg: 1 }} spacing={2}>
                            {dropdown.map((item, index) => (
                              <Grid item xs={6}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    p: 2,
                                    borderStyle: "solid",
                                    borderBlockColor: "#C6C6C6",
                                    borderRight: `4px solid #014547`,
                                    borderLeftColor: "#C6C6C6",
                                    height: 40,
                                    width: 390,
                                    marginLeft: 2,
                                    marginTop: 1,
                                  }}
                                  className={styles.dropdown}
                                >
                                  {item.title}
                                </Box>
                                <Grid>
                                  <Box className={styles.fill}>
                                    <i className={styles.i}>
                                      <img src={Fills} alt="" />
                                    </i>
                                  </Box>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </div> */}
                      </Grid>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <Grid item md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      "& > :not(style)": {
                        width: 380,
                        height: 262.5,
                        // ml: 2,
                        mt: 1,
                      },
                    }}
                  >
                    <Paper
                      square
                      elevation={1}
                      sx={{ backgroundColor: "white" }}
                    >
                      <Grid item md={8}>
                        <Paper
                          square
                          elevation={1}
                          sx={{
                            width: 222,
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: "100",
                                marginLeft: 1,
                              }}
                            >
                              SSA Committee Default
                            </Typography>
                          </Box>
                        </Paper>
                        <div style={{ display: "flex" }}>
                          <Grid container columns={{ lg: 1 }} spacing={0}>
                            {dropsdown1.map((item, index) => (
                              <Grid item xs={6}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    p: 2,
                                    borderStyle: "solid",
                                    borderBlockColor: "#C6C6C6",
                                    borderRight: `4px solid #014547`,
                                    borderLeftColor: "#C6C6C6",
                                    height: 50,
                                    width: 205,
                                    marginLeft: 1,
                                    marginTop: 1,
                                  }}
                                  className={styles.dropdown}
                                >
                                  <Typography fontSize={14}>
                                    {item.title}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      </Grid>
                    </Paper>
                    {/* <Grid>
                      <Box className={styles.fill}>
                        <i className={styles.i}>
                          <img src={Ellipse} alt="" />
                        </i>
                      </Box>
                    </Grid> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                marginLeft: 5.5,
                marginTop: -1,
              }}
            >
              <StyledCardContainer>
                <StyledCardHeading>Scenario Creation Date</StyledCardHeading>
                <StyledCardPag>
                  Pinging google.com [192.168.1.1] with 32 bytes of data: Reply
                  from 192.168.1.1: bytes=32 time=1ms TTL=53 Reply from
                  192.168.1.1: bytes=32 time=2ms TTL=53 Diagnostic completed
                  successfully. We found 0 errors.
                </StyledCardPag>
              </StyledCardContainer>
            </Grid>
            <Grid
              item
              md={12}
              sx={{
                // marginLeft: 3,
                marginTop: -1,
              }}
            >
              <Grid>
                <Box
                  sx={{
                    display: "flex",
                    p: 2,
                    marginLeft: 83,
                    width: 350,
                  }}
                >
                  <Typography
                    sx={{
                      marginRight: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#A87791",
                      }}
                    >
                      Schedule
                    </Button>
                  </Typography>
                  <Typography>
                    <Button variant="contained" sx={{ bgcolor: "#9C9C9C" }}>
                      Job Saved
                    </Button>
                  </Typography>
                </Box>
              </Grid>
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
                  position: "fixed",
                  mt: 1,
                },
              }}
              className={styles.header}
            >
              <Paper square elevation={1} sx={{ backgroundColor: "white" }}>
                {Leftbardata.map((item) => (
                  <Box sx={{ p: 1, pl: 4 }}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: Palette.Grey.lightest,
                        marginTop: 2,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: 25, fontWeight: "100" }}>
                      {item.subTitle}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(JobManager);
