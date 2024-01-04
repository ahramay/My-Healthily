import React from "react";
import { Todo } from "./models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
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
interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <Grid container columns={{ lg: 1 }} spacing={2}>
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <Grid
              className={` ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Box>
                {todos?.map((title, index) => (
                  <SingleTodo
                    index={index}
                    todos={todos}
                    title={title}
                    key={title.id}
                    setTodos={setTodos}
                  />
                ))}
              </Box>
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.todos}  ${
                snapshot.isDraggingOver ? styles.dragcomplete : styles.remove
              }`}
            >
              <span className={styles.todos_heading}>Completed Tasks</span>
              {CompletedTodos?.map((title, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
                  title={title}
                  key={title.id}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
    </div>
  );
};

export default TodoList;

{
  /* <div style={{ display: "flex" }}>
<Grid container columns={{ lg: 1 }} spacing={2}>
  {dropdown.map((item, index) => (
    <Grid item xs={6}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          borderStyle: "solid",
          borderBlockColor: "#C6C6C6",
          borderLeftColor: "#C6C6C6",
          borderRight: `4px solid #014547`,
          height: 40,
          marginLeft: 3,
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
<Grid container columns={{ lg: 1 }} spacing={2}>
  {dropsdown.map((item, index) => (
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
          marginLeft: 3,
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
</div> */
}
