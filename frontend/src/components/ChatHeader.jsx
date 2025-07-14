import { X } from 'lucide-react';
import { useMessageStore } from '../store/messageStore'
import { useAuthStore } from '../store/userAuthStore';

function ChatHeader() {

  const { selectedUser, setSelectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b flex items-center">
        <img 
            src={selectedUser?.profilePic || "avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover" 
        />
        <div className="ml-3">
            <h3 className="font-medium">{selectedUser?.fullName || "No User Selected"}</h3>
            <p className="text-xs text-gray-500">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
        </div>
        <button 
          className='ml-auto cursor-pointer' 
          onClick={() => setSelectedUser(null)}>
          <X />
        </button>
    </div>
  )
}

export default ChatHeader