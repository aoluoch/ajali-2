import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    const resultAction = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(resultAction)) {
      return { success: true };
    }
    return { success: false, error: resultAction.payload };
  };

  const register = async (userData) => {
    const resultAction = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(resultAction)) {
      return { success: true };
    }
    return { success: false, error: resultAction.payload };
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout
  };
};