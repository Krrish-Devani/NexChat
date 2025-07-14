import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageContainer from '../components/MessageContainer'
import NoChatSelected from '../components/NoChatSelected'
import { useMessageStore } from '../store/messageStore'
import MessageInput from '../components/MessageInput'

function HomePage() {

  const { selectedUser } = useMessageStore();

  return (
    <div className='pt-16 min-h-screen bg-gray-100'>
      <div className='container mx-auto p-4 max-w-6xl h-[calc(100vh-4rem)]'>
        <div className='flex flex-col md:flex-row gap-4 h-full'>
          <Sidebar />
          <div className='w-full md:w-2/3 bg-white rounded-lg shadow flex flex-col h-full'>
            {selectedUser && <ChatHeader />}
            {!selectedUser ? <NoChatSelected /> : <MessageContainer />}
            {selectedUser && <MessageInput />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage