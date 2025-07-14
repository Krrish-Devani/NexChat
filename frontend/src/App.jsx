import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/userAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

function App() {

  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log(authUser);
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={ !authUser ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/login" element={ !authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={ authUser ? <Profile /> : <Navigate to={"/login"} />} />

      </Routes>

      <Toaster />
    </div>
  )
}

export default App