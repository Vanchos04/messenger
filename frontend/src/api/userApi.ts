import axios from 'axios'
import { User } from '@/pages/UserListPage.tsx'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api('/users/')
  return response.data
}

export const fetchUserChats = async (userId: number) => {
  try {
    const response = await api.get(`/chats/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user chats:', error)
    return []
  }
}

export const createChat = async (userId1: number, userId2: number) => {
  console.log('Creating chat with:', { userId1, userId2 })
  const response = await api.post('/chats/create-chat', {
    userId: userId1,
    directPartnerId: userId2,
    type: 'DIRECT',
  })
  return response.data
}
