import FloatingShapes from './components/FloatingShapes';
import { Navigate , Route , Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import { Toaster } from "react-hot-toast";
import  useAuthStore  from './store/authStore';
import { useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isverified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};



const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("RedirectAuthenticatedUser: ", { isAuthenticated, user });

  if (isAuthenticated && user.isverified) {
    return <Navigate to="/" replace />;
  }

  return children;
};



export default function App() {
  const {isCheckingAuth , checkAuth} = useAuthStore()
  useEffect(() => {
    checkAuth();
  } , [checkAuth])


  if (isCheckingAuth) return <LoadingSpinner />;

  // console.log("isAuthenticated" , isAuthenticated);
  // console.log("user" , user); 
  return (
    <div className="min-h-screen bg-gradient-to-br
    from-orange-900 via-gray-800 to-pink-900 flex items-center justify-center 
    relative overflow-hidden">

      <FloatingShapes color="bg-orange-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShapes color="bg-pink-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShapes color="bg-yellow-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />


      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
              <LoginPage />
          </RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        } />
      </Routes> 
      <Toaster />
    </div>
  )
} 