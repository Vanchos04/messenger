import { Route } from 'react-router'
import { AuthLayout } from './Layout.tsx'
import { LoginPage } from '@/pages/LoginPage.tsx'
import { RegisterPage } from '@/pages/RegisterPage.tsx'
import { ChatPage } from '@/pages/ChatPage.tsx'

export const authRouter = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="chatpage" element={<ChatPage />} />
  </Route>
)
