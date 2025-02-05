import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Providers } from './Providers.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthLayout } from '@/auth/Layout.tsx'
import { LoginPage } from '@/pages/LoginPage.tsx'
import RegisterPage from '@/pages/RegisterPage.tsx'
import { ChatPage } from '@/pages/ChatPage.tsx'
import { ProtectedRoute } from '@/router/ProtectedRoute.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'

const queryClient = new QueryClient()
function isAuthenticated() {
  const token = localStorage.getItem('token')

  if (!token) return false

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]))
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route
              path="/chatpage"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </Providers>
  </StrictMode>,
)
