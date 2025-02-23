import axios from 'axios'

export const fetchMessages = async (chatId: number) => {
  const response = await axios.get(`http://localhost:3000/messages/${chatId}`)
  return response.data
}

export const sendMessage = async (chatId: number, fromId: number, type: string = 'text', replyTo?: number) => {
  const response = await axios.post(`http://localhost:3000/messages`, {
    chatId,
    fromId,
    type,
    replyTo: replyTo ?? null,
  })

  return response.data
}
