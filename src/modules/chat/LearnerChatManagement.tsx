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
import { api, config } from "../../configs";

// Connect to the Socket.io server
const socket = io(`${config.API_BASE_URL}/chats`, {
  transports: ["websocket"],
  upgrade: false,
});

const useSocket = (socket: Socket) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data") || "{}");

    socket.emit("setup", userData.id);

    const handleConnected = () => {
      console.log("user connected");
    };

    const handleStartTyping = (typeData: { typeName: string }) =>
      dispatch(startTyping(typeData.typeName));
    const handleStopTyping = () => dispatch(stopTyping());
    const handleOnlineCount = (data: { onlineCount: number }) => {
      console.log("online counts", data.onlineCount);
      dispatch(setOnlineUserCount(data.onlineCount));
    };

    socket.on("connected", handleConnected);
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
        const response = await api.get("/api/chats/groups");
        if (response && response.status === 200) {
          dispatch(fetchGroupsSuccess(response.data.data));
        } else {
          dispatch(fetchGroupsFailure("Failed to fetch groups"));
        }
      } catch (error: any) {
        dispatch(fetchGroupsFailure(error.response.data.message));
      }
    };

    fetchGroups();
  }, [dispatch]);

  return (
    <div className="h-[600px] w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg flex overflow-hidden">
      {/* Main chat area */}
      <div className={`md:block ${showSidebar ? "hidden" : "block"} md:w-64`}>
        <ChatSidebar socket={socket} />
      </div>

      {/* Chat content */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          onMenuClick={() => setShowSidebar(!showSidebar)}
          onInfoClick={() => setShowInfo(!showInfo)}
        />
        <div className="flex-1 flex overflow-hidden">
          <div
            className={`flex-1 flex flex-col ${
              showInfo ? "hidden md:flex" : "flex"
            }`}
          >
            <ChatMessages socket={socket} />
            <MessageInput socket={socket} />
          </div>
          {showInfo && <GroupInfoSidebar onClose={() => setShowInfo(false)} />}
        </div>
      </div>
    </div>
  );
};

export default MainChatLayout;
