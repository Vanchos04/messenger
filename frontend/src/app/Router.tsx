import { Routes } from 'react-router'
import { authRouter } from '../auth/router.tsx'

export function Router() {
  return <Routes>{authRouter}</Routes>
}
