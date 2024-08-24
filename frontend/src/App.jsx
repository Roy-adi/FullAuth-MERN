import { BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import FloatingShape from "./components/FloatingShape";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ResetPasswordPage from "./Pages/ResetPassword";
import { Toaster } from "react-hot-toast";


function App() {
  // ProtectedRoute component
  const ProtectedRoute = ({ element: Component }) => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <div
          className='min-h-screen bg-gradient-to-br
            from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
        >
          <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
          <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
          
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
