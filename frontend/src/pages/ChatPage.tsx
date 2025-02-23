import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, sendMessage } from '@/api/chatApi'
import { useState } from 'react'

export function ChatPage() {
  const { chatId } = useParams() // Get chat ID from URL
  const queryClient = useQueryClient()
  const currentUserId = Number(localStorage.getItem('userId'))
  const [message, setMessage] = useState('')

  // Fetch messages with polling every 3 seconds
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(Number(chatId)),
    enabled: !!chatId,
    refetchInterval: 3000, // Polling for updates
  })

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => sendMessage(Number(chatId), currentUserId, text),
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

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 border-b ${msg.fromId === currentUserId ? 'text-right' : 'text-left'}`}>
            <strong>{msg.from.username}:</strong> {msg.type === 'text' ? msg.text : '[Unsupported Message]'}
          </div>
        ))}
      </div>

      {/* Message Input */}
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
          disabled={sendMessageMutation.isLoading}
        >
          Send
        </button>
      </div>
    </div>
  )
}
