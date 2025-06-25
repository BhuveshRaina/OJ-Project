import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }){
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);
  const { pathname: path } = useLocation();

  if (status === 'loading') return null;

  if (!isAuthenticated) {
    const openForGuests = ['/', '/signin', '/signup'];
    return openForGuests.includes(path) ? children : <Navigate to="/signin" replace />;
  }

  if (path === '/signin' || path === '/signup' || path === '/') return <Navigate to="/dashboard" replace />;

  if (path === '/createProblem') {
    const isProblemSetter = user?.role === 'problemSetter';
    return isProblemSetter ? children : <Navigate to="/dashboard " replace />;
  }

  return children;
}
