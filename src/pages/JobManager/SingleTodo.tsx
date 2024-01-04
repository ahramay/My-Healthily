import React from "react";
import { Todo } from "./models/models";
import { Draggable } from "react-beautiful-dnd";
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
const SingleTodo: React.FC<{
  index: number;
  title: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, title }) => {
  return (
    <Grid item xs={6}>
      <Draggable draggableId={title.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${snapshot.isDragging ? "drag" : ""}`}
          >
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
              {title.title}
            </Box>
            <div></div>
          </form>
        )}
      </Draggable>
    </Grid>
  );
};

export default SingleTodo;

// <Grid item xs={6}>
// <Box
//   sx={{
//     display: "flex",
//     p: 2,
//     borderStyle: "solid",
//     borderBlockColor: "#C6C6C6",
//     borderLeftColor: "#C6C6C6",
//     borderRight: `4px solid #014547`,
//     height: 40,
//     marginLeft: 3,
//   }}
//   className={styles.dropdown}
// >
//   {item.title}
// </Box>
// <Grid>
