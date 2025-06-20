import { useParams } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, MessageType, sendMessage } from '@/api/chatApi'
import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import { FileUploadModal } from '@/components/FileUploadModal.tsx'

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null) // To store the image URL

  useEffect(() => {
    if (chatId) {
      localStorage.setItem('chatId', chatId.toString())
    }
  }, [chatId])

  const queryClient = useQueryClient()
  const currentUserId = Number(localStorage.getItem('userId'))

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<MessageType>(MessageType.TEXT)

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
    if (message.trim() || imageUrl) {
      const content = imageUrl ? `<img src="${imageUrl}" alt="Image" />` : message
      sendMessageMutation.mutate(content)
    }
  }

  const handleFileUpload = (uploadedImageUrl: string) => {
    setImageUrl(uploadedImageUrl)
    setMessage('') // Clear message input if uploading an image
    setMessageType(MessageType.IMAGE) // Set message type to IMAGE
  }

  if (!chatId) return <p>Error: Chat ID is missing</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 border-b ${msg.fromId === currentUserId ? 'text-right' : 'text-left'}`}>
            <strong>{msg.from.username}:</strong>
            {msg.type === 'TEXT' ? msg.content : <div dangerouslySetInnerHTML={{ __html: msg.content }} />}
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
        <button className="ml-2 p-2 bg-gray-300 text-black" onClick={() => setIsUploadModalOpen(true)}>
          <Upload />
        </button>
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white"
          disabled={sendMessageMutation.isPending}
        >
          Send
        </button>
      </div>

      {isUploadModalOpen && (
        <FileUploadModal onClose={() => setIsUploadModalOpen(false)} onFileUploaded={handleFileUpload} />
      )}
    </div>
  )
}
