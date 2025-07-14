import { LogOut, MessageCircle, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/userAuthStore'

function Navbar() {

    const { authUser, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
    }

  return ( 
    <nav className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 fixed w-full top-0 z-40 backdrop-blur-lg shadow-sm">
        <div className='container mx-auto px-6 h-16'>
            <div className='flex items-center justify-between h-full'>
                <div className='flex items-center gap-8'>
                    <Link 
                        to={authUser ? "/" : "/login"} 
                        className='flex items-center gap-3 hover:opacity-90 transition-all duration-200 group'
                    >
                        <div className='p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200'>
                            <MessageCircle className='w-6 h-6 text-white' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                                NexChat
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className='flex items-center gap-4'>
                    { authUser && (
                        <>
                            <Link 
                                to={"/profile"}
                                className='flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-blue-50 rounded-lg border border-slate-200 transition-all duration-200 hover:shadow-md hover:border-blue-300 group'
                            >
                                <User className='w-5 h-5 text-slate-600 group-hover:text-blue-600' />
                                <span className='text-sm font-medium text-slate-700 group-hover:text-blue-600'>Profile</span>
                            </Link>

                            <button 
                                onClick={handleLogout} 
                                className='flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 hover:shadow-md group' 
                                type='button'
                            >
                                <LogOut className='w-5 h-5' />
                                <span className='text-sm font-medium'>Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar