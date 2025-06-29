import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user, status } = useSelector(s => s.auth);
  const { pathname } = useLocation();
  console.log(pathname)
  if (status === 'loading') return null;

  if (!isAuthenticated) {
    const open = ['/', '/signin', '/signup'];
    return open.includes(pathname)
      ? children
      : <Navigate to="/signin" replace />;
  }

  if (['/', '/signin', '/signup'].includes(pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (pathname === '/createProblems') {
    return user?.role === 'problemSetter'
      ? children
      : <Navigate to="/dashboard" replace />;
  }


  return children;
}
