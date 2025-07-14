import { useEffect } from "react";
import { useMessageStore } from "../store/messageStore"
import { useAuthStore } from "../store/userAuthStore";
import { MessageCircle, Search, Users } from "lucide-react";

function Sidebar() {
  const { selectedUser, setSelectedUser, isLoadingUsers, getUsers, users } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoadingUsers) {
    return (
      <div className="w-full md:w-1/3 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-slate-600 font-medium">Loading conversations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg shadow-lg border border-slate-200">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-white/60 backdrop-blur-sm rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Messages</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
              {users.length} contacts
            </span>
          </div>
        </div>
      </div>
      
      {/* Chat list */}
      <div className="overflow-y-auto" style={{height: '450px'}}>
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Users className="w-12 h-12 text-slate-400 mb-3" />
            <p className="text-slate-600 font-medium">No conversations yet</p>
            <p className="text-slate-400 text-sm">Start chatting with your friends!</p>
          </div>
        ) : (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full transition-all duration-200 ${
                selectedUser?._id === user._id
                  ? 'bg-blue-500/20 border-l-4 border-blue-500'
                  : 'hover:bg-white/50'
              }`}
            >
              <div className="p-4 flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={user.profilePic || "avatar.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm">
                      <span className="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></span>
                    </span>
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold ${
                      selectedUser?._id === user._id 
                        ? 'text-blue-700' 
                        : 'text-slate-800'
                    }`}>
                      {user.fullName}
                    </h3>
                    {onlineUsers.includes(user._id) && (
                      <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                        Online
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    {onlineUsers.includes(user._id) ? 'Active now' : 'Tap to message'}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default Sidebar