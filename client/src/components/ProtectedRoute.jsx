import { Navigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdimin }) {
  const { user } = useAuthContext();

  // 새로고침 시 user가 잠시 'undefined' 상태가 되는 문제 해결.
  if (user === undefined) {
    return <>Wait...</>;
  }
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
