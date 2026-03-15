import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",

  initialState: [],

  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },

    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },

    toggleTask: (state, action) => {
      const task = state.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;