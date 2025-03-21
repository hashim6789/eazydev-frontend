import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import userImage from "../../assets/img/user_image.avif";
import { addMessage } from "../../store/slice";
import { formatTo12HourTime } from "../../utils/date.util";

interface ChatMessagesProps {
  socket: Socket;
}

const ChatMessages = ({ socket }: ChatMessagesProps) => {
  const user = JSON.parse(localStorage.getItem("data") ?? "{}");
  const userId = user.id;
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.message
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleMessage = (newMessage: any) => {
      console.log("message received successfully.");
      dispatch(addMessage(newMessage));
    };

    socket.on("receive message", handleMessage);

    return () => {
      socket.off("receive message", handleMessage);
    };
  }, [dispatch, socket]);

  console.log("messages", messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Loading messages...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}
      {!loading &&
        !error &&
        messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender._id === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] flex ${
                message.sender._id === userId ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.sender._id !== userId && (
                <div className="flex flex-col items-center space-y-1 mr-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src={message.sender.profilePicture || userImage}
                      alt=""
                    />
                  </div>
                </div>
              )}
              <div>
                {message.sender._id !== userId && (
                  <p className="text-sm text-gray-500 mb-1 ml-1">
                    {message.sender.name}
                  </p>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender._id === userId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="break-words">{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender._id === userId
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTo12HourTime(message.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatMessages;
