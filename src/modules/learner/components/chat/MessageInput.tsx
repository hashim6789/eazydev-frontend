// import { zodResolver } from "@hookform/resolvers/zod";
// import { Send } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import api from "../../../../shared/utils/api";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../../../store";
// import { addMessage } from "../../../../store/slices/messageSlice";
// import { Socket } from "socket.io-client";
// import { useState } from "react";

// interface MessageInputProps {
//   socket: Socket;
// }

// interface FormData {
//   message: string;
// }

// const messageSchema = z.object({
//   message: z.string(),
// });

// const MessageInput = ({ socket }: MessageInputProps) => {
//   const { selectedGroupId } = useSelector((state: RootState) => state.group);
//   const dispatch = useDispatch<AppDispatch>();
//   const [isTyping, setIsTyping] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(messageSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       data.message = data.message.trim();
//       if (data.message === "") return;
//       const response = await api.post(
//         `api/chats/groups/${selectedGroupId}/message`,
//         data
//       );
//       if (response && response.status === 200) {
//         const messageData = response.data.data;
//         console.log(messageData);
//         socket.emit("send message", messageData);
//         dispatch(addMessage(messageData));

//         reset();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleTyping = () => {
//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit("start typing", { groupId: selectedGroupId });

//       setTimeout(() => {
//         setIsTyping(false);
//         socket.emit("stop typing", { groupId: selectedGroupId });
//       }, 2000);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4 bg-white">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             {...register("message")}
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             onChange={handleTyping}
//           />
//           <button
//             type="submit"
//             className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
//           >
//             <Send size={20} />
//           </button>
//         </div>
//         {errors.message && (
//           <p className="text-red-500 mt-2">{errors.message.message}</p>
//         )}
//       </form>
//     </>
//   );
// };

// export default MessageInput;
