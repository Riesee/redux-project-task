import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000/tasks";

// Thunk GET
export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jesonResponse = await response.json();
      return jesonResponse;
    } else {
      return rejectWithValue({ error: "No Tasks found" });
    }
  }
);

// Thunk POST
export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jesonResponse = await response.json();
      return jesonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Added" });
    }
  }
);

// Thunk PATCH
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(`${BASE_URL}/${task.id}`, options);
    if (response.ok) {
      const jesonResponse = await response.json();
      return jesonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);

// Thunk DELETE
export const deleteTaskInServer = createAsyncThunk(
  "tasks/deleteTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(`${BASE_URL}/${task.id}`, options);
    if (response.ok) {
      const jesonResponse = await response.json();
      return jesonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Deleted" });
    }
  }
);

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    updateTaskInLıst: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.tasksList = [];
      })
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInLıst,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;
