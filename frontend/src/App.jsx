import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Error from './pages/Error'
import { Logout } from './pages/Logout'
import { AuthProvider } from './store/auth'   
import Dashboard from './pages/Dashboard'
import CategorySelect from './pages/AptitudeModule/CategorySelect'
import DifficultySelect from './pages/AptitudeModule/DifficultySelect'
import LevelSelect from './pages/AptitudeModule/LevelSelect'
import QuizPage from './pages/AptitudeModule/QuizPage'
import ResultPage from './pages/AptitudeModule/ResultPage'
import ProtectedRoute from './components/ProtectedRoute'



function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Aptitude Module Routes */}
            <Route path="/aptitude" element={<ProtectedRoute><CategorySelect /></ProtectedRoute>} />
            <Route path="/aptitude/difficulty/:category" element={<ProtectedRoute><DifficultySelect /></ProtectedRoute>} />
            <Route path="/aptitude/levels/:category/:difficulty" element={<ProtectedRoute><LevelSelect /></ProtectedRoute>} />
            <Route path="/aptitude/quiz/:category/:difficulty/:level" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/aptitude/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
            
            <Route path="*" element={<Error/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
