import { Navigate } from 'react-router'
import { toast } from 'sonner'

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: JSX.Element
}

export function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    toast.error('You need to log in to access this page.')
    return <Navigate to="/auth/login" replace />
  }

  return children
}
