import axios from 'axios'

const API_URL = 'http://localhost:3000/messages'

export enum MessageType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  IMAGE = 'IMAGE',
  GIF = 'GIF',
  EMOJI = 'EMOJI',
}

interface MessagePayload {
  chatId: number
  fromId: number
  content: string
  type: MessageType
}

/**
 * Send a text message
 */
export const sendMessage = async (
  chatId: number,
  fromId: number,
  content: string,
  type: MessageType = MessageType.TEXT,
) => {
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

/**
 * Send an image message
 */
export const sendImageMessage = async (chatId: number, fromId: number, file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('chatId', chatId.toString())
  formData.append('fromId', fromId.toString())
  formData.append('type', MessageType.IMAGE) // Ensures the backend knows it's an image

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    console.error('Error sending image message:', error)
    throw error
  }
}

/**
 * Fetch all messages for a chat
 */
export async function fetchMessages(chatId: number) {
  try {
    const response = await axios.get(`${API_URL}/${chatId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}
