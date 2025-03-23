import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sender = {
  id: string;
  name: string;
  profilePicture: string;
};

interface Message {
  id: string;
  sender: Sender;
  message: string;
  createdAt: string;
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  //   messages: [],
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    fetchMessagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess(state, action: PayloadAction<Message[]>) {
      state.loading = false;
      state.messages = action.payload;
    },
    fetchMessagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action: PayloadAction<Message>) {
      const index = state.messages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const {
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addMessage,
  updateMessage,
  deleteMessage,
} = messageSlice.actions;

export const messageReducers = messageSlice.reducer;
