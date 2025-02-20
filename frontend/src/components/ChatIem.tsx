import { useNavigate } from 'react-router'

const ChatItem = ({ chat }: { chat: any }) => {
  const navigate = useNavigate()

  return (
    <div
      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      onClick={() => navigate(`/chats/${chat.id}`)}
    >
      <div>
        <h3 className="font-semibold">{chat.type === 'DIRECT' ? chat.partnerName : chat.name}</h3>
        <p className="text-sm text-gray-500">{chat.lastMessage ? chat.lastMessage.text : 'No messages yet'}</p>
      </div>
      {chat.unreadCount > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{chat.unreadCount}</span>
      )}
    </div>
  )
}

export default ChatItem
