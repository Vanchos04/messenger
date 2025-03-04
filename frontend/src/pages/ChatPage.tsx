import { useParams } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, MessageType, sendMessage } from '@/api/chatApi'
import { useEffect, useState } from 'react'

interface Message {
  id: number
  fromId: number
  chatId: number
  type: string
  replyTo?: number | null
  content: string
  from: {
    id: number
    username: string
  }
}

export function ChatPage() {
  const { chatId: chatIdParam } = useParams()
  const chatId = chatIdParam ? Number(chatIdParam) : null

  useEffect(() => {
    if (chatId) {
      localStorage.setItem('chatId', chatId.toString())
    }
  }, [chatId])

  console.log('Current Chat ID:', chatId)

  if (!chatId) return <p>Error: Chat ID is missing</p>
  const queryClient = useQueryClient()
  const currentUserId = Number(localStorage.getItem('userId'))

  const [message, setMessage] = useState('')
  const [messageType] = useState<MessageType>(MessageType.TEXT)

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(Number(chatId)),
    enabled: !!chatId,
    refetchInterval: 3000,
  })

  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => sendMessage(Number(chatId), currentUserId, text, messageType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] })
      setMessage('')
    },
  })

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message)
    }
  }

  if (!chatId) return <p>Error: Chat ID is missing</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 border-b ${msg.fromId === currentUserId ? 'text-right' : 'text-left'}`}>
            <strong>{msg.from.username}:</strong> {msg.type === 'TEXT' ? msg.content : '[Unsupported Message]'}
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white"
          disabled={sendMessageMutation.isPending}
        >
          Send
        </button>
      </div>
    </div>
  )
}
