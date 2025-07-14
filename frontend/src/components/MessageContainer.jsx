import { useEffect, useRef } from "react";
import { useMessageStore } from "../store/messageStore"
import { useAuthStore } from "../store/userAuthStore";

function MessageContainer() {

  const { messages, selectedUser, isLoadingMessages, getMessages, newMessage, removerMessageListener } = useMessageStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    newMessage();
    return () => {
      removerMessageListener();
    };
  }, [getMessages, selectedUser._id, newMessage, removerMessageListener]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <div key={message._id} className="mb-4">
            {/* Incoming message */}
            {message.senderId === selectedUser._id && (
              <div className="flex mb-4">
                <img
                  src={selectedUser.profilePic || "avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
                <div className="ml-3">
                  {message.image ? (
                    <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-xs border">
                      <img src={message.image} alt="image" className="rounded w-full" />
                      <div className="text-xs text-gray-500 pt-2">{message.text}</div>
                  </div>
                  ) : (
                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                      <p>{message.text}</p>
                    </div>
                  )}
                <span className="text-xs text-gray-500 mt-1 block">{new Date(message.createdAt || message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
            </div>
            )}
            
            {/* Outgoing message */}
            {message.senderId === authUser._id && (
                <div className="flex mb-4 justify-end">
                <div className="mr-3 flex flex-col items-end">
                {message.image ? (
                    <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-xs border">
                      <img src={message.image} alt="image" className="rounded w-full" />
                      <div className="text-xs text-gray-500 pt-2">{message.text}</div>
                  </div>
                ) : (
                  <div className="bg-blue-500 text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-xs">
                    <p>{message.text}</p>
                  </div>
                )}
                <span className="text-xs text-gray-500 mt-1 block">{new Date(message.createdAt || message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <img
                  src={authUser.profilePic || "avatar.png"} 
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
            </div>
            )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageContainer
