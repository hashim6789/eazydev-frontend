import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import MessageInput from "./MessageInput";
import GroupInfoSidebar from "./GroupInfoSidebar";
import ChatHeader from "./ChatHeader";
import {
  fetchGroupsFailure,
  fetchGroupsStart,
  fetchGroupsSuccess,
  setOnlineUserCount,
  startTyping,
  stopTyping,
} from "../../store/slice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import ChatMessages from "./ChatMessages";
import { api } from "../../configs";
import { getUserProperty } from "../../utils/local-user.util";
import { GroupChatMessages, HttpStatusCode } from "../../constants";

// Connect to the Socket.io server
// const socket = io(`${config.API_BASE_URL}/chats`, {
//   transports: ["websocket"],
//   upgrade: false,
// });

const socket = io("https://www.muhammedhashim.online/chats", {
  path: "/socket.io/",
  transports: ["websocket"],
});

const useSocket = (socket: Socket) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = getUserProperty("id") as string;

    socket.emit("setup", userId);

    const handleConnected = () => {
      console.log("user connected");
    };

    const handleStartTyping = (typeData: { typeName: string }) =>
      dispatch(startTyping(typeData.typeName));
    const handleStopTyping = () => dispatch(stopTyping());
    const handleOnlineCount = (data: { onlineCount: number }) => {
      dispatch(setOnlineUserCount(data.onlineCount));
    };

    socket.on("connected", handleConnected);
    // socket.on("receive message", handleConnected);
    socket.on("start typing", handleStartTyping);
    socket.on("stop typing", handleStopTyping);
    socket.on("online", handleOnlineCount);

    return () => {
      socket.off("connected", handleConnected);
      socket.off("start typing", handleStartTyping);
      socket.off("stop typing", handleStopTyping);
      socket.off("online", handleOnlineCount);
    };
  }, [dispatch, socket]);
};

const MainChatLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useSocket(socket);

  useEffect(() => {
    const fetchGroups = async () => {
      dispatch(fetchGroupsStart());
      try {
        const response = await api.get("/chats/groups");
        if (response && response.status === HttpStatusCode.OK) {
          console.log("response", response.data);
          dispatch(fetchGroupsSuccess(response.data));
        } else {
          dispatch(fetchGroupsFailure(GroupChatMessages.ERROR.FETCH));
        }
      } catch (error: any) {
        dispatch(fetchGroupsFailure(error.response.data.message));
      }
    };

    fetchGroups();
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg">
      {/* Main chat area with responsive sidebar */}
      <div className="flex h-full">
        {/* Sidebar (visible on medium screens and larger) */}
        <div
          className={`md:block ${
            showSidebar ? "hidden" : "block"
          } w-full md:w-64 bg-gray-100 border-r`}
        >
          <ChatSidebar socket={socket} />
        </div>

        {/* Chat content area */}
        <div className="flex flex-1 flex-col h-full">
          {/* Chat Header */}
          <ChatHeader
            onMenuClick={() => setShowSidebar(!showSidebar)}
            onInfoClick={() => setShowInfo(!showInfo)}
          />

          {/* Main Chat Area and Input */}
          <div className="flex flex-1 overflow-hidden">
            <div
              className={`flex-1 flex flex-col ${
                showInfo ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Chat Messages */}
              <ChatMessages socket={socket} />

              {/* Message Input */}
              <MessageInput socket={socket} />
            </div>

            {/* Group Info Sidebar (visible when toggled) */}
            {showInfo && (
              <div className="w-full md:w-64 bg-gray-100 border-l">
                <GroupInfoSidebar onClose={() => setShowInfo(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatLayout;
