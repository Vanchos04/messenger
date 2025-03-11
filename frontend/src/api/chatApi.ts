import axios from 'axios'

const API_URL = 'http://localhost:3000/messages'

export enum MessageType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  IMAGE = 'IMAGE',
  GIF = 'GIF',
  EMOJI = 'EMOJI',
}

export const sendMessage = async (chatId: number, fromId: number, content: string, type: MessageType) => {
  try {
    const response = await axios.post(API_URL, {
      chatId,
      fromId,
      content,
      type,
    })
    return response.data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function fetchMessages(chatId: number) {
  try {
    const response = await axios.get(`${API_URL}/${chatId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}
