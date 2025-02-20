import axios from 'axios'
import { Chat } from '@/components/ChatList.tsx'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export const fetchChats = async (): Promise<Chat[]> => {
  const response = await api('/chats/1')
  return response.data
}
