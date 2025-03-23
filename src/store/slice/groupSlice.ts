import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Group {
  id: string;
  title: string;
  thumbnail: string;
  memberCount: number;
  mentor: User | null;
  learners: User[];
}

interface GroupState {
  groups: Group[];
  selectedGroupId: string | null;
  loading: boolean;
  error: string | null;
  isTyping: boolean;
  typeName: string;
  onlineCount: number;
}

const initialState: GroupState = {
  groups: [],
  selectedGroupId: null,
  loading: false,
  error: null,
  isTyping: false,
  typeName: "",
  onlineCount: 0,
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchGroupsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsSuccess(state, action: PayloadAction<Group[]>) {
      console.log("action.payload", action.payload);
      state.loading = false;
      state.groups = action.payload;
    },
    fetchGroupsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    updateGroup(state, action: PayloadAction<Group>) {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.id
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup(state, action: PayloadAction<string>) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
    selectGroup(state, action: PayloadAction<string>) {
      state.selectedGroupId = action.payload;
    },

    startTyping(state, action) {
      state.isTyping = true;
      state.typeName = action.payload;
    },
    stopTyping(state) {
      state.isTyping = false;
      state.typeName = "";
    },
    setOnlineUserCount(state, action) {
      state.onlineCount = action.payload;
    },
  },
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  addGroup,
  updateGroup,
  deleteGroup,
  selectGroup,
  startTyping,
  stopTyping,
  setOnlineUserCount,
} = groupSlice.actions;

export const groupReducers = groupSlice.reducer;
