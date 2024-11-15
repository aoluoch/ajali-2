import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Mail, Lock, LogIn, UserCircle, ArrowLeft, LogOut } from 'lucide-react';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = isRegistering
        ? await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
          })
        : await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',  // Include cookies for session handling
          });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Redirect to dashboard on successful login
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError(isRegistering ? 'Failed to create account' : 'Failed to sign in');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',  // Include cookies for session handling
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // On successful logout, navigate to login page
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Failed to log out');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          
          {isRegistering && (
            <button
              onClick={() => setIsRegistering(false)}
              className="flex items-center text-gray-600 mb-4 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </button>
          )}

          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            {isRegistering ? 'Create Account' : 'Sign in to Ajali!'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form
              key={isRegistering ? 'register' : 'login'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    />
                    <UserCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  {isRegistering ? 'Create Account' : 'Sign in'}
                </button>
              </div>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6 text-center">
            {isRegistering ? (
              <button
                onClick={() => setIsRegistering(false)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Already have an account? Sign in
              </button>
            ) : (
              <button
                onClick={() => setIsRegistering(true)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Don&apos;t have an account? Sign up
              </button>
            )}
          </div>

          {/* Logout button */}
          {!isRegistering && (
            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500 flex items-center justify-center"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
