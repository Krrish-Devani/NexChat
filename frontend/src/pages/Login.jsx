import { useState } from "react";
import { useAuthStore } from "../store/userAuthStore"
import { Link } from "react-router-dom";
import { MessageCircle, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

function Login() {

  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      return await login(formData);
    }
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is Required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is Required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl'>
            <MessageCircle className='h-8 w-8 text-white' />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className='text-center text-slate-600 mb-8'>
          Don't have an account?{' '}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white/80 backdrop-blur-sm py-10 px-8 shadow-2xl rounded-2xl border border-slate-200/50'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-semibold text-slate-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-slate-400' />
                </div>
                <input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white/70'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-semibold text-slate-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-slate-400' />
                </div>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='block w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white/70'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                className='w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className='animate-spin h-5 w-5' />
                    Logging In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login