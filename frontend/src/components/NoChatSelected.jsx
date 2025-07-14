import { MessageSquare, Users, Zap } from 'lucide-react'

function NoChatSelected() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        {/* Main Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Welcome to NexChat
        </h2>
        
        {/* Subtitle */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          Select a conversation from the sidebar to start chatting with your friends and colleagues.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-slate-700 font-medium">Connect with anyone</span>
          </div>
          
          <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-slate-700 font-medium">Real-time messaging</span>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected;