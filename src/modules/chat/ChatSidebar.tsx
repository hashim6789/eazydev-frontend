import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  selectGroup,
  fetchGroupsFailure,
  fetchGroupsStart,
  fetchGroupsSuccess,
} from "../../store/slice/groupSlice";

import { useEffect } from "react";
import { Socket } from "socket.io-client";
import {
  fetchMessagesFailure,
  fetchMessagesStart,
  fetchMessagesSuccess,
} from "../../store/slice/messageSlice";
import { api } from "../../configs";
import { ErrorState, LoadingState, NoContentState } from "../shared/Error";

interface ChatSidebarProps {
  socket: Socket;
}

const ChatSidebar = ({ socket }: ChatSidebarProps) => {
  const { groups, selectedGroupId, loading, error } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     dispatch(fetchGroupsStart());
  //     try {
  //       const response = await api.get("/api/chats/groups");
  //       if (response && response.status === 200) {
  //         dispatch(fetchGroupsSuccess(response.data));
  //       } else {
  //         dispatch(fetchGroupsFailure("failed to fetch groups"));
  //       }
  //     } catch (error: any) {
  //       dispatch(fetchGroupsFailure(error.response.data.message));
  //     }
  //   };

  //   fetchGroups();
  // }, [dispatch]);

  useEffect(() => {
    if (selectedGroupId) {
      socket.emit("join chat", { groupId: selectedGroupId });
      console.log("user joined groupid", selectedGroupId);
    }

    () => {
      if (selectedGroupId) {
        socket.emit("leave chat", { groupId: selectedGroupId });
        console.log("user joined groupid", selectedGroupId);
      }
    };
  });

  const handleGroupChat = async (groupId: string) => {
    try {
      dispatch(fetchMessagesStart());
      const response = await api.get(`/api/chats/groups/${groupId}/messages`);
      if (response && response.status === 200) {
        socket.emit("leave chat", { groupId: selectedGroupId });
        console.log("user joined groupid", selectedGroupId);
        dispatch(selectGroup(groupId));
        dispatch(fetchMessagesSuccess(response.data));
        // socket.emit("join chat", { groupId });
        // console.log("user joined groupid", groupId);
      }
    } catch (error: any) {
      dispatch(fetchMessagesFailure(error.response.data.message));
      console.error(error);
    }
  };

  console.log("groups", groups);

  return (
    <aside className="w-64 border-r bg-white h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Course Groups</h2>
      </div>
      <div className="py-2">
        {loading && <LoadingState />}
        {error && <ErrorState />}
        {groups && groups.length === 0 && (
          <NoContentState
            title="You are not enrolled any courses"
            message="There are no groups"
          />
        )}
        {!loading &&
          !error &&
          groups &&
          groups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleGroupChat(group.id)}
              className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150
                ${selectedGroupId === group.id ? "bg-blue-50" : ""}`}
            >
              <img
                src={group.thumbnail}
                alt="Course Thumbnail"
                className={`h-8 w-8 rounded-full ${
                  selectedGroupId === group.id
                    ? "border-blue-600"
                    : "border-gray-500"
                }`}
              />
              <div className="text-left">
                <p
                  className={`font-medium ${
                    selectedGroupId === group.id
                      ? "text-blue-600"
                      : "text-gray-800"
                  }`}
                >
                  {group.title}
                </p>
                <p className="text-sm text-gray-500">
                  {group.memberCount + 1} members
                </p>
              </div>
            </button>
          ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
